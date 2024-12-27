import { TeamEntity } from 'src/teams/entities/team.entity';
import { Modify } from './generic/modify';
import { SeasonEntity } from 'src/seasons/entities/season.entity';

interface ICreateLeagueDto {
  name: string;
  profilePicture: string;
  season: string;
}

type ILeagueEntity = Modify<
  ICreateLeagueDto,
  {
    teams: TeamEntity[];
    season: SeasonEntity;
  }
>;

type ILeagueResponseDto = ILeagueEntity;

export { ICreateLeagueDto, ILeagueEntity, ILeagueResponseDto };
