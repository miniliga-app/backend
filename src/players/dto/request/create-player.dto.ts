import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/types/user';
import { CreatePlayerDataDto } from '../player-data/create-player-data.dto';

export class CreatePlayerDto extends CreateUserDto {
  @IsNotEmptyObject()
  @Type(() => CreatePlayerDataDto)
  @ValidateNested()
  playerData: CreatePlayerDataDto;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsIn([UserRole.PLAYER])
  role: UserRole;
}
