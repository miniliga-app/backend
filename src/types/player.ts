// import { ICreateUserDto, UserRole } from './user';
// import { CreatePlayerDataDto } from 'src/players/dto/player-data/create-player-data.dto';

import { Modify } from './generic/modify';
import { ICreateUserDto, UserRole } from './user';
import { CreatePlayerDataDto } from 'src/players/dto/player-data/create-player-data.dto';

// type ICreatePlayerDto = ICreateUserDto & {
//   role: UserRole.PLAYER;
//   playerData: CreatePlayerDataDto;
// };
type ICreatePlayerDto = Modify<
  ICreateUserDto,
  {
    role: UserRole.PLAYER;
    playerData: CreatePlayerDataDto;
  }
>;

export { ICreatePlayerDto };
