import { NotFoundException } from '@nestjs/common';

export class TriedToRemoveNonExistingUserException extends NotFoundException {
  constructor() {
    super('Tried to remove non existing user');
  }
}
