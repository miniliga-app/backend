import { TeamEntity } from 'src/teams/entities/team.entity';
import { Modify } from './generic/modify';
import { DominantLeg, PlayerPosition } from './enum';

interface ICreatePlayerDataDto {
  dateOfBirth: Date;
  height: number;
  dominantLeg: DominantLeg;
  position: PlayerPosition;
  number: number;
  headedTeams?: string[];
  teams: string[];
  requestsToJoin: string[];
}

type IPlayerDataEntity = Modify<
  ICreatePlayerDataDto,
  {
    headedTeams: TeamEntity[];
    teams: TeamEntity[];
    requestsToJoin: TeamEntity[];
  }
>;

export { ICreatePlayerDataDto, IPlayerDataEntity };
