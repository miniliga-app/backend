import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CreatePlayerDto } from 'src/players/dto/request/create-player.dto';
import { UserRole } from 'src/types/user';

export const IsPlayerDataValid =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) =>
    registerDecorator({
      name: 'isPlayerDataValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          const { role } = args.object as CreatePlayerDto;
          // return role === UserRole.PLAYER ? value != null : value == null;
          console.log('VALUE: ', value);
          // if (role === UserRole.PLAYER) return value != null;
          // else return value == null;
          return role === UserRole.PLAYER ? value != null : value == null;
        },
      },
    });
