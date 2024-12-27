import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBase64,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsPlayerDataValid } from 'src/decorators/validation/is-player-data-valid.validation';
import { CreatePlayerDataDto } from 'src/players/dto/player-data/create-player-data.dto';

import { ICreateUserDto, UserRole } from 'src/types/user';
import { IsEmailNotTakenForNewUser } from 'src/validators/is-email-not-taken/is-email-not-taken-for-new-user.validator';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({ type: 'string', description: 'Name of user' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  name: string;

  @ApiProperty({ type: 'string', description: 'Surname of user' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 120)
  surname: string;

  @ApiProperty({ type: 'string', description: 'Email of user' })
  @IsNotEmpty()
  @IsEmail()
  @IsEmailNotTakenForNewUser()
  email: string;

  @ApiProperty({ type: 'string', description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, description: 'Role of user' })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ type: 'string', description: 'Profile picture of user' })
  @IsOptional()
  @IsBase64()
  profilePicture: string;

  @ApiPropertyOptional()
  @ApiProperty({
    type: 'string',
    description: 'Expo push token for notifications',
  })
  @IsOptional()
  @IsString()
  @Length(39, 39)
  expoToken: string;

  // @ApiProperty({
  //   type: () => CreatePlayerDataDto,
  //   description: 'Specific player data while creating player',
  // })
  @IsPlayerDataValid({
    message: 'player data should not be empty, whether role is player',
  })
  @Type(() => CreatePlayerDataDto)
  @ValidateNested()
  playerData: CreatePlayerDataDto;
}
