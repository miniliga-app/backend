import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { TeamEntity } from '../entities/team.entity';
import { TeamJoinRequestEntity } from '../entities/team-join-request.entity';

@Injectable()
export class TeamJoinRequestsService {
  private async findTeam(teamId: string): Promise<TeamEntity> {
    const team = await TeamEntity.findOne({
      where: { id: teamId },
      relations: ['league'],
    });
    if (!team) throw new NotFoundException(`Team with ID ${teamId} not found`);
    return team;
  }

  private async findPlayer(playerId: string): Promise<PlayerDataEntity> {
    const player = await PlayerDataEntity.findOne({ where: { id: playerId } });
    if (!player)
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    return player;
  }

  async createTeamJoinRequest({
    teamId,
    playerId,
  }: {
    teamId: string;
    playerId: string;
  }): Promise<void> {
    const [team, player] = await Promise.all([
      this.findTeam(teamId),
      this.findPlayer(playerId),
    ]);

    if (
      await TeamJoinRequestEntity.findOne({
        where: { team: { id: teamId }, player: { id: playerId } },
      })
    ) {
      throw new ConflictException('Join request already exists');
    }

    await TeamJoinRequestEntity.create({ team, player }).save();
  }

  async acceptTeamJoinRequest({
    teamId,
    playerId,
  }: {
    teamId: string;
    playerId: string;
  }): Promise<void> {
    const [team, player] = await Promise.all([
      this.findTeam(teamId),
      this.findPlayer(playerId),
    ]);
    const request = await TeamJoinRequestEntity.findOne({
      where: { team: { id: teamId }, player: { id: playerId } },
    });

    if (!request) throw new NotFoundException('Join request not found');

    await Promise.all([
      request.remove(),
      TeamJoinRequestEntity.delete({
        player: { id: playerId },
        team: { league: { id: team.league.id } },
      }),
      (async () => {
        team.players.push(player);
        await team.save();
      })(),
    ]);
  }

  async rejectTeamJoinRequest({
    teamId,
    playerId,
  }: {
    teamId: string;
    playerId: string;
  }): Promise<void> {
    const request = await TeamJoinRequestEntity.findOne({
      where: { team: { id: teamId }, player: { id: playerId } },
    });

    if (!request) throw new NotFoundException('Join request not found');

    await request.remove();
  }

  async getTeamJoinRequestsByTeamId(
    teamId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    await this.findTeam(teamId);
    return TeamJoinRequestEntity.find({ where: { team: { id: teamId } } });
  }

  async getTeamJoinRequestsByPlayerId(
    playerId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    await this.findPlayer(playerId);
    return TeamJoinRequestEntity.find({ where: { player: { id: playerId } } });
  }
}
