import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { DominantLeg, PlayerPosition } from 'src/types/enum';
import { ICreatePlayerDataDto } from 'src/types/player-data';

export class CreatePlayerDataDto implements ICreatePlayerDataDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(140)
  @Max(250)
  height: number;

  @IsNotEmpty()
  @IsEnum(DominantLeg)
  dominantLeg: DominantLeg;

  @IsNotEmpty()
  @IsEnum(PlayerPosition)
  position: PlayerPosition;

  @IsNumber()
  @Min(1)
  @Max(99)
  number: number;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString({ each: true })
  @IsUUID(4, { each: true })
  /**
   * TODO 1.: transform id of teams to TeamEntities (check if every team exists)
   * TODO 2.: validator to check if every team has not already other captain
   * TODO 3.: validator to check if there is no conflict (player is not already in other team in the same league)
   */
  headedTeams?: string[];

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsUUID(4, { each: true })
  /**
   * TODO 1.: transform id of teams to TeamEntities (check if every team exists)
   * TODO 2.: check if there is no conflict (player is not in other team of the same league)
   */
  teams: string[];

  @IsOptional()
  @IsString({ each: true })
  requestsToJoin: string[];
}
