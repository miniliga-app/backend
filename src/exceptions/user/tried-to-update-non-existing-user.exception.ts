import { NotFoundException } from '@nestjs/common';

export class TriedToUpdateNonExistingUserException extends NotFoundException {
  constructor() {
    super('Tried to update non existing user');
  }
}
