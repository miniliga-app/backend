import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ICreateTeamDto } from 'src/types/team';

export class CreateTeamDto implements ICreateTeamDto {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  shortName: string;

  @IsNotEmpty()
  @IsString()
  longName: string;

  @IsNotEmpty()
  @IsString()
  @IsBase64()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  /**
   * TODO 1. validator to check if captain exists
   * TODO 2. validator to check if there is not conflicts (player of team in league A tries to create team in the same league)
   */
  captain: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  /**
   * TODO 1. validator to check if league exists
   */
  league: string;
}
