import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableShutdownHooks();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);
};

bootstrap();
