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
  name: string;
  @IsOptional()
  @IsString()
  @IsBase64()
  profilePicture: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID(4, { each: true })
  season: string;
}
