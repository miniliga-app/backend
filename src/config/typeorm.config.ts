import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const getEnv = <T>(envVar: string) => configService.get<T>(envVar);

    const typeOrmConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      host: getEnv<string>('DB_HOST'),
      port: getEnv<number>('DB_PORT'),
      username: getEnv<string>('DB_USERNAME'),
      password: getEnv<string>('DB_PASSWORD'),
      database: getEnv<string>('DB_NAME'),
      logging: getEnv<boolean>('DB_IS_LOGGING_ENABLED'),
      synchronize: getEnv<boolean>('DB_IS_SYNCHRONIZING_ENABLED'),
      autoLoadEntities: true,
      retryAttempts: 10,
    };

    return typeOrmConfig;
  },
  dataSourceFactory: async options =>
    await new DataSource(options).initialize(),
};
