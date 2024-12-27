import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ICreateLeagueDto } from 'src/types/league';

export class CreateLeagueDto implements ICreateLeagueDto {
  @IsNotEmpty()
  @IsString()
  /**
   * TODO 1. validator to check if name is not taken
   */
  name: string;
  @IsOptional()
  @IsString()
  @IsBase64()
  profilePicture: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID(4, { each: true })
  /**
   * TODO 1. validator to check if every team is not already in other league
   */
  teams: string[];
  season: string;
}
