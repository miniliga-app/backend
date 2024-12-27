import { forwardRef, Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PlayersModule } from 'src/players/players.module';
import { TeamJoinRequestsService } from './team-join-request/team-join-request.service';

@Module({
  imports: [forwardRef(() => PlayersModule)],
  controllers: [TeamsController],
  providers: [TeamsService, TeamJoinRequestsService],
  exports: [TeamsService, TeamJoinRequestsService],
})
export class TeamsModule {}
