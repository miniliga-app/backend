import { ParseUUIDPipe } from '@nestjs/common';

export const parseUuidPipe = new ParseUUIDPipe({ version: '4' });
