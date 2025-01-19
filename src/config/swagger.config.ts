import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Minileague API docs')
  .setDescription('Docs of Minileague app')
  .setVersion('1.2')
  .addTag('')
  .build();
