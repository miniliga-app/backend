import { forwardRef, Inject } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PlayersService } from 'src/players/players.service';

@ValidatorConstraint({ async: true })
class IsPlayerExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => PlayersService))
    private readonly playersService: PlayersService,
  ) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    console.log('VALUE: ', value);
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Player does not exist';
  }
}

export const IsPlayerExists =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPlayerExistsConstraint,
    });
  };
