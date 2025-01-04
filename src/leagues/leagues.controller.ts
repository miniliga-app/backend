import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  forwardRef,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/request/create-league.dto';
import { UpdateLeagueDto } from './dto/request/update-league.dto';
import { LeagueResponseDto } from './dto/response/league-response.dto';
import { parseUuidPipe } from 'src/pipes';

@Controller('leagues')
export class LeaguesController {
  constructor(
    @Inject(forwardRef(() => LeaguesService))
    private readonly leaguesService: LeaguesService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createLeague(
    @Body() createLeagueDto: CreateLeagueDto,
  ): Promise<LeagueResponseDto> {
    return this.leaguesService.createLeague(createLeagueDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAllLeagues(): Promise<LeagueResponseDto[]> {
    return this.leaguesService.findAllLeagues();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOneLeague(
    @Param('id', parseUuidPipe) id: string,
  ): Promise<LeagueResponseDto> {
    return this.leaguesService.findOneLeague(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateLeague(
    @Param('id', parseUuidPipe) id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ): Promise<LeagueResponseDto> {
    return this.leaguesService.updateLeague(id, updateLeagueDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeOneLeague(@Param('id') id: string): Promise<void> {
    return this.leaguesService.removeOneLeague(id);
  }
}
