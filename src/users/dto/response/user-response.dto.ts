import { Exclude } from 'class-transformer';
import { UserEntity } from '../../entities/user.entity';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { UserRole } from 'src/types/user';
import { NonFunctionProperties } from 'src/types/generic/non-function-properties';
import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDto implements NonFunctionProperties<UserEntity> {
  @ApiResponseProperty({
    type: 'string',
    example: 'db4225f1-484a-426e-8b79-f8f691e9d81c',
  })
  id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'John',
  })
  name: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Doe',
  })
  surname: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'john@doe.com',
  })
  email: string;

  @ApiResponseProperty({
    enum: UserRole,
    example: UserRole.FAN,
  })
  role: UserRole;

  @ApiResponseProperty({
    type: 'string',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9tAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  })
  profilePicture: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
  })
  expoToken: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'sdf9paysdfsd98afusdf;LKJDFS:LSDKJoiHFSD(*FYDSih',
  })
  currentTokenId: string;

  @ApiPropertyOptional()
  @ApiResponseProperty({
    type: 'object',
  })
  playerData: PlayerDataEntity;

  @ApiResponseProperty({
    type: 'string',
    example: '2022-01-01T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiResponseProperty({
    type: 'string',
    example: '2022-01-01T12:00:00.000Z',
  })
  updatedAt: Date;

  @ApiResponseProperty({
    type: 'string',
    example: '2022-01-01T12:00:00.000Z',
  })
  deletedAt: Date;

  @Exclude()
  password: string;
}
