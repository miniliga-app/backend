import { Exclude } from 'class-transformer';
import { UserEntity } from '../../entities/user.entity';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { UserRole } from 'src/types/user';
import { NonFunctionProperties } from 'src/types/generic/non-function-properties';

export class UserResponseDto implements NonFunctionProperties<UserEntity> {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  profilePicture: string;
  expoToken: string;
  currentTokenId: string;
  playerData: PlayerDataEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  @Exclude()
  password: string;
}
