import { LeagueEntity } from 'src/leagues/entities/league.entity';
import { Modify } from './generic/modify';

interface ICreateSeasonDto {
  startDate: Date;
  endDate: Date;
  name: string;
  profilePicture: string;
  leagues: string[];
}

type ISeasonEntity = Modify<
  ICreateSeasonDto,
  {
    leagues: LeagueEntity[];
  }
>;

type ISeasonResponseDto = ISeasonEntity;

export { ICreateSeasonDto, ISeasonEntity, ISeasonResponseDto };
