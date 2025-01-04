import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/request/create-team.dto';
import { UpdateTeamDto } from './dto/request/update-team.dto';
import { TeamResponseDto } from './dto/response/team-response.dto';
import { TeamJoinRequestEntity } from './entities/team-join-request.entity';
import { TeamJoinRequestsService } from './team-join-request/team-join-request.service';
import { parseUuidPipe } from 'src/pipes';

@Controller('teams')
export class TeamsController {
  constructor(
    @Inject(forwardRef(() => TeamsService))
    private readonly teamsService: TeamsService,

    @Inject(forwardRef(() => TeamJoinRequestsService))
    private readonly teamJoinRequestsService: TeamJoinRequestsService,
  ) {}

  @Post('/')
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.createTeam(createTeamDto);
  }

  @Get('/')
  async findAllTeams(): Promise<TeamResponseDto[]> {
    return this.teamsService.findAllTeams();
  }

  @Get('/:id')
  async findOneTeam(
    @Param('id', parseUuidPipe) id: string,
  ): Promise<TeamResponseDto> {
    return this.teamsService.findOneTeam(id);
  }

  @Patch('/:id')
  async updateTeam(
    @Param('id', parseUuidPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.updateTeam(id, updateTeamDto);
  }

  @Delete('/:id')
  async removeOneTeam(@Param('id', parseUuidPipe) id: string): Promise<void> {
    return this.teamsService.removeOneTeam(id);
  }

  @Post('/:id/requests-to-join')
  async createTeamJoinRequest(
    @Param('id', parseUuidPipe) teamId: string,
    @Query('playerId', parseUuidPipe) playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.createTeamJoinRequest({
      teamId,
      playerId,
    });
  }

  @Post('/:id/requests-to-join/accept')
  async acceptTeamJoinRequest(
    @Param('id', parseUuidPipe) teamId: string,
    @Query('playerId', parseUuidPipe) playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.acceptTeamJoinRequest({
      teamId,
      playerId,
    });
  }

  @Post('/:id/requests-to-join/reject')
  async rejectTeamJoinRequest(
    @Param('id', parseUuidPipe) teamId: string,
    @Query('playerId', parseUuidPipe) playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.rejectTeamJoinRequest({
      teamId,
      playerId,
    });
  }

  @Get('/:id/requests-to-join')
  async getTeamJoinRequestsByTeamId(
    @Param('id', parseUuidPipe) teamId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    return this.teamJoinRequestsService.getTeamJoinRequestsByTeamId(teamId);
  }

  @Get('/requests-to-join')
  async getTeamJoinRequestsByPlayerId(
    @Query('playerId', parseUuidPipe) playerId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    return this.teamJoinRequestsService.getTeamJoinRequestsByPlayerId(playerId);
  }
}
