import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeagueDto } from './dto/request/create-league.dto';
import { UpdateLeagueDto } from './dto/request/update-league.dto';
import { LeagueEntity } from './entities/league.entity';
import { plainToInstance } from 'class-transformer';
import { LeagueResponseDto } from './dto/response/league-response.dto';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class LeaguesService {
  constructor(
    @Inject(forwardRef(() => TeamsService))
    private readonly teamsService: TeamsService,
  ) {}
  async create(createLeagueDto: CreateLeagueDto): Promise<LeagueResponseDto> {
    const league = new LeagueEntity();

    Object.assign(league, createLeagueDto);

    return plainToInstance(LeagueResponseDto, await league.save());
  }

  async update(
    id: string,
    { teams }: UpdateLeagueDto,
  ): Promise<LeagueResponseDto> {
    const league = await this.validateLeague(id);

    const teamsToAssign: TeamEntity[] = await Promise.all(
      teams.map(async teamId => await this.teamsService.validateTeam(teamId)),
    );

    league.teams = teamsToAssign;

    return plainToInstance(LeagueResponseDto, await league.save());
  }

  async findAll(): Promise<LeagueResponseDto[]> {
    const leagues = await LeagueEntity.find({
      relations: {
        teams: {
          players: true,
        },
      },
    });

    return plainToInstance(LeagueResponseDto, leagues);
  }

  async findOne(id: string): Promise<LeagueResponseDto> {
    const league = await this.validateLeague(id);

    return plainToInstance(LeagueResponseDto, league);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await LeagueEntity.delete({ id });
    if (!affected)
      throw new NotFoundException('Tried to remove non existing league');
  }

  async findOneById(id: string): Promise<LeagueEntity> {
    return (await LeagueEntity.findOneBy({ id })) ?? null;
  }

  async findAllTeams(id: string): Promise<TeamEntity[]> {
    const league = await LeagueEntity.findOne({
      where: { id },
      relations: ['teams', 'teams.players', 'teams.captain'],
    });

    if (!league) throw new NotFoundException('League not found');

    return league.teams;
  }

  async validateLeague(id: string): Promise<LeagueEntity> {
    const league = await this.findOneById(id);

    if (!league) throw new NotFoundException('League not found');

    return league;
  }
}
