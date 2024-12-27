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

@Controller('teams')
export class TeamsController {
  constructor(
    @Inject(forwardRef(() => TeamsService))
    private readonly teamsService: TeamsService,

    @Inject(forwardRef(() => TeamJoinRequestsService))
    private readonly teamJoinRequestsService: TeamJoinRequestsService,
  ) {}

  @Post('/')
  async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
    return this.teamsService.create(createTeamDto);
  }

  @Get('/')
  async findAll(): Promise<TeamResponseDto[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TeamResponseDto> {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(id);
  }

  @Post(':id/requests-to-join')
  async createJoinRequest(
    @Param('id') teamId: string,
    @Query('playerId') playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.createRequest({ teamId, playerId });
  }

  @Post(':id/requests-to-join/accept')
  async acceptJoinRequest(
    @Param('id') teamId: string,
    @Query('playerId') playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.acceptRequest({ teamId, playerId });
  }

  @Post(':id/requests-to-join/reject')
  async rejectJoinRequest(
    @Param('id') teamId: string,
    @Query('playerId') playerId: string,
  ): Promise<void> {
    return this.teamJoinRequestsService.rejectRequest({ teamId, playerId });
  }

  @Get(':id/requests-to-join')
  async getJoinRequestsByTeam(
    @Param('id') teamId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    return this.teamJoinRequestsService.getRequestsByTeam(teamId);
  }

  @Get('/requests-to-join/player/:playerId')
  async getJoinRequestsByPlayer(
    @Param('playerId') playerId: string,
  ): Promise<TeamJoinRequestEntity[]> {
    return this.teamJoinRequestsService.getRequestsByPlayer(playerId);
  }
}
