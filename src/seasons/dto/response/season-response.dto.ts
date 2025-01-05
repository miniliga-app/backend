import { Expose } from 'class-transformer';
import { LeagueEntity } from 'src/leagues/entities/league.entity';
import { ISeasonResponseDto } from 'src/types/season';

@Expose()
export class SeasonResponseDto implements ISeasonResponseDto {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  profilePicture: string;
  leagues: LeagueEntity[];
}
