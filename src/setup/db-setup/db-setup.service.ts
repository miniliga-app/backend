import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DbSetupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DbSetupService.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      await this.dataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      this.logger.log('Db setup successfully');
    } catch (error) {
      this.logger.error(
        'Error while setting up Db:',
        error.stack || error.message,
      );
    }
  }
}
