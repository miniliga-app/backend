import { Expose } from 'class-transformer';
import { TeamEntity } from 'src/teams/entities/team.entity';

@Expose()
export class TeamResponseDto extends TeamEntity {}
