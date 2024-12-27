import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { DbSetupService } from './db-setup/db-setup.service';

@Module({
  providers: [SetupService, DbSetupService],
  exports: [SetupService],
})
export class SetupModule {}
