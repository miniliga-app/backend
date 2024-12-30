import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types/user';
import { hashText } from 'src/utils/hash-text/hash-text';
import { UsersService } from 'src/users/users.service';
import { PlayerResponseDto } from './dto/response/player-response.dto';
import { plainToInstance } from 'class-transformer';
import { TeamsService } from 'src/teams/teams.service';
import { LeaguesService } from 'src/leagues/leagues.service';
import { EmailTakenException } from 'src/exceptions/user/email-taken.exception';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UpdatePlayerDto } from './dto/request/update-player.dto';
import { CreatePlayerDto } from './dto/request/create-player.dto';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { PlayerDataEntity } from './entities/player-data.entity';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';

@Injectable()
export class PlayersService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => TeamsService))
    private readonly teamsService: TeamsService,

    @Inject(forwardRef(() => LeaguesService))
    private readonly leaguesService: LeaguesService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<PlayerResponseDto[]> {
    const players = await this.findAllPlayers();
    return plainToInstance(PlayerResponseDto, players);
  }

  async findOnePlayer(id: string): Promise<PlayerResponseDto> {
    const player = await this.validatePlayer(id);
    return plainToInstance(PlayerResponseDto, player);
  }

  async createPlayer({
    email,
    password,
    ...rest
  }: CreatePlayerDto): Promise<PlayerResponseDto> {
    const player = new UserEntity();

    Object.assign(player, {
      email,
      password: await hashText(password),
      ...rest,
    });

    return plainToInstance(PlayerResponseDto, await player.save());
  }

  async updatePlayer(
    id: string,
    { email, ...rest }: UpdatePlayerDto,
  ): Promise<PlayerResponseDto> {
    const player = await this.validatePlayer(id);
    if (email && (await this.usersService.isEmailTaken(email)))
      throw new EmailTakenException();
    await this.usersService.updateUserProperties(player, { email, ...rest });
    return plainToInstance(PlayerResponseDto, await player.save());
  }

  async removeOnePlayer(id: string): Promise<void> {
    const { affected } = await UserEntity.delete({ id, role: UserRole.PLAYER });
    if (!affected)
      throw new NotFoundException('Tried to remove non existing player');
  }

  async isPlayerAvailableInExistingTeam({
    playerId,
    teamId,
  }: {
    playerId: string;
    teamId: string;
  }): Promise<boolean> {
    const leagueIdSubQuery = this.dataSource
      .createQueryBuilder(TeamEntity, 'team')
      .select('team.leagueId')
      .where('team.id = :teamId', { teamId });

    return !(await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from(TeamEntity, 'team')
      .innerJoin('team.league', 'league')
      .innerJoin('team.players', 'player')
      .where(`player.id = :playerId`, { playerId })
      .andWhere(`league.id = (${leagueIdSubQuery.getQuery()})`)
      .setParameters(leagueIdSubQuery.getParameters())
      .limit(1)
      .getRawOne());
  }

  async isPlayerAvailableInNewTeam({
    playerId,
    leagueId,
  }: {
    playerId: string;
    leagueId: string;
  }): Promise<boolean> {
    const existingPlayer = await this.dataSource
      .createQueryBuilder(PlayerDataEntity, 'player')
      .select('player.id')
      .where('player.id = :playerId', { playerId })
      .getOne();

    if (!existingPlayer)
      throw new NotFoundException('Tried to add non-existing player');

    const conflictingPlayer = await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from(TeamEntity, 'team')
      .innerJoin('team.league', 'league')
      .innerJoin('team.players', 'player')
      .where('player.id = :playerId', { playerId })
      .andWhere('league.id = :leagueId', { leagueId })
      .limit(1)
      .getRawOne();

    return !conflictingPlayer;
  }

  async isEveryPlayerAvailableInExistingTeam({
    playerIds,
    teamId,
  }: {
    playerIds: string[];
    teamId: string;
  }): Promise<boolean> {
    const leagueIdSubQuery = this.dataSource
      .createQueryBuilder(TeamEntity, 'team')
      .select('team.leagueId')
      .where('team.id = :teamId', { teamId });

    const conflictingPlayer = await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from(TeamEntity, 'team')
      .innerJoin('team.league', 'league')
      .innerJoin('team.players', 'player')
      .where('player.id IN (:...playerIds)', { playerIds })
      .andWhere(`league.id = (${leagueIdSubQuery.getQuery()})`)
      .setParameters(leagueIdSubQuery.getParameters())
      .limit(1)
      .getRawOne();

    return !conflictingPlayer;
  }

  async isEveryPlayerAvailableInNewTeam({
    playerIds,
    leagueId,
  }: {
    playerIds: string[];
    leagueId: string;
  }): Promise<boolean> {
    const existingPlayers = await this.dataSource
      .createQueryBuilder(PlayerDataEntity, 'player')
      .select('player.id')
      .where('player.id IN (:...playerIds)', { playerIds })
      .getMany();

    if (existingPlayers.length !== playerIds.length) {
      throw new NotFoundException('One or more players do not exist');
    }

    const conflictingPlayer = await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from(TeamEntity, 'team')
      .innerJoin('team.league', 'league')
      .innerJoin('team.players', 'player')
      .where('player.id IN (:...playerIds)', { playerIds })
      .andWhere('league.id = :leagueId', { leagueId })
      .limit(1)
      .getRawOne();

    return !conflictingPlayer;
  }

  async isPlayerAvailableToBeSetAsCaptainInExistingTeam({
    playerId,
    teamId,
  }: {
    playerId: string;
    teamId: string;
  }): Promise<boolean> {
    try {
      await this.validatePlayer(playerId);
      await this.teamsService.validateTeam(teamId);
    } catch (error) {
      return false;
    }

    return await this.isPlayerAvailableInExistingTeam({
      playerId,
      teamId,
    });
  }

  async isPlayerAvailableToBeSetAsCaptainInNewTeam({
    playerId,
    leagueId,
  }: {
    playerId: string;
    leagueId: string;
  }): Promise<boolean> {
    try {
      await this.validatePlayer(playerId);
      await this.leaguesService.validateLeague(leagueId);
    } catch (error) {
      return false;
    }

    return await this.isPlayerAvailableInNewTeam({
      leagueId,
      playerId,
    });
  }

  async validatePlayer(playerId: string): Promise<UserEntity> {
    const player = await this.findOnePlayerById(playerId);

    if (!player) throw new NotFoundException('Player not found');

    return player;
  }

  async findOnePlayerById(id: string): Promise<UserEntity> {
    return (await UserEntity.findOneBy({ id, role: UserRole.PLAYER })) ?? null;
  }

  async findAllPlayers(): Promise<PlayerResponseDto[]> {
    const players = await UserEntity.findBy({ role: UserRole.PLAYER });
    return plainToInstance(PlayerResponseDto, players);
  }
}
