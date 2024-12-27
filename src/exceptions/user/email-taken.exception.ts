import { ConflictException } from '@nestjs/common';

export class EmailTakenException extends ConflictException {
  constructor() {
    super('Email already taken');
  }
}
