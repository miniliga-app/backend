import { forwardRef, Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [forwardRef(() => TeamsModule)],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [forwardRef(() => LeaguesService)],
})
export class LeaguesModule {}
