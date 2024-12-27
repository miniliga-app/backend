import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { Modify } from './generic/modify';
import { LeagueEntity } from 'src/leagues/entities/league.entity';

interface ICreateTeamDto {
  shortName: string; // 3 letter name
  longName: string; // unlimited length
  profilePicture: string; // base64 encoded profile picture
  captain: string; // id of player, who is captain
  league: string; // id of team league
}

type ITeamEntity = Modify<
  ICreateTeamDto,
  {
    captain: PlayerDataEntity;
    players: PlayerDataEntity[];
    league: LeagueEntity;
    requestsToJoin: PlayerDataEntity[];
  }
>;

export { ICreateTeamDto, ITeamEntity };
