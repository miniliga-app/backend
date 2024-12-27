import { TeamEntity } from 'src/teams/entities/team.entity';
import { Modify } from './generic/modify';
import { ITeamEntity } from './team';
import { SeasonEntity } from 'src/seasons/entities/season.entity';

// export interface ILeague {
//   name: string;
//   profilePicture: string;
//   teams: ITeamEntity[];
//   // season: SeasonInterface;
// }
interface ICreateLeagueDto {
  name: string;
  profilePicture: string;
  teams: string[];
  season: string;
}

type ILeagueEntity = Modify<
  ICreateLeagueDto,
  {
    teams: TeamEntity[];
    season: SeasonEntity;
  }
>;

export { ICreateLeagueDto, ILeagueEntity };
