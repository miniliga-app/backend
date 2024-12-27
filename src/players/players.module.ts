import { forwardRef, Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { UsersModule } from 'src/users/users.module';
import { TeamsModule } from 'src/teams/teams.module';
import { LeaguesModule } from 'src/leagues/leagues.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TeamsModule),
    forwardRef(() => LeaguesModule),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
