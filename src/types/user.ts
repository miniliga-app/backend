import { UserEntity } from 'src/users/entities/user.entity';
import { Modify } from './generic/modify';
import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { CreatePlayerDataDto } from 'src/players/dto/player-data/create-player-data.dto';

enum UserRole {
  FAN = 1,
  PREMIUM_FAN = 2,
  PLAYER = 3,
  ADMIN = 4,
}
interface ICreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture: string;
  expoToken: string;
  playerData: CreatePlayerDataDto;
}

type IUserEntity = Modify<
  CreateUserDto,
  {
    playerData: PlayerDataEntity;
    currentTokenId: string;
  }
>;

type UserResponse = UserEntity;

type CreateUserResponse = UserResponse;
type UpdateUserResponse = UserResponse;
type GetOneUserResponse = UserResponse;
type GetAllUsersResponse = GetOneUserResponse[];
type RemoveUserResponse = void;

export {
  IUserEntity,
  UserRole,
  UserResponse,
  ICreateUserDto,
  CreateUserResponse,
  UpdateUserResponse,
  GetOneUserResponse,
  GetAllUsersResponse,
  RemoveUserResponse,
};
