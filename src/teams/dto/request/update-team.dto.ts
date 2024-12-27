import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsPlayerExists } from 'src/validators/is-player-exists.validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsPlayerExists({ each: true })
  players: string[];
}
