import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { Logger } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api', app, document, {
    useGlobalPrefix: true,
    jsonDocumentUrl: '/api/json',
    yamlDocumentUrl: '/api/yaml',
  });

  await app.listen(process.env.APP_PORT);
  Logger.log(`App is running on ${await app.getUrl()}`);
};

bootstrap();
