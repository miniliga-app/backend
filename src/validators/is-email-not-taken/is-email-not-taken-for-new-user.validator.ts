import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailNotTakenForNewUserConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async validate(email: string, args: ValidationArguments) {
    return !(await this.usersService.isEmailTaken(email));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email is already taken';
  }
}

export function IsEmailNotTakenForNewUser(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailNotTakenForNewUserConstraint,
    });
  };
}
