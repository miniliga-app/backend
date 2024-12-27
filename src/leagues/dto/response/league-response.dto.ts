import { Expose } from 'class-transformer';
import { LeagueEntity } from 'src/leagues/entities/league.entity';

@Expose()
export class LeagueResponseDto extends LeagueEntity {}
