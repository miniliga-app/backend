import { IsNotEmpty, IsOptional } from 'class-validator';
import { ICreateSeasonDto } from 'src/types/season';

export class CreateSeasonDto implements ICreateSeasonDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() startDate: Date;
  @IsNotEmpty() endDate: Date;
  @IsNotEmpty() profilePicture: string;
  @IsOptional() leagues: string[];
}
