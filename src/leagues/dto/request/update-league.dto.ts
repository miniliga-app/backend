import { PartialType } from '@nestjs/swagger';
import { CreateLeagueDto } from './create-league.dto';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class UpdateLeagueDto {
  @IsArray()
  @IsString({ each: true })
  @IsUUID(4, { each: true })
  teams: string[];
}
