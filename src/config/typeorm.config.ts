import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const getEnv = <T>(envVar: string, defaultValue?: T): T => {
      return configService.get<T>(envVar, defaultValue);
    };

    const typeOrmConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      host: getEnv<string>('DB_HOSTNAME'),
      port: getEnv<number>('DB_PORT'),
      username: getEnv<string>('DB_USERNAME'),
      password: getEnv<string>('DB_PASSWORD'),
      database: getEnv<string>('DB_NAME'),
      logging: getEnv<boolean>('DB_IS_LOGGING_ENABLED', false),
      synchronize: getEnv<boolean>('DB_IS_SYNCHRONIZING_ENABLED', false),
      entities: [__dirname + '/../../dist/**/*.entity{.ts,.js}'],
      retryAttempts: 10,
    };

    return typeOrmConfig;
  },
  dataSourceFactory: async options =>
    await new DataSource(options).initialize(),
};
