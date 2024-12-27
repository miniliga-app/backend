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

@Controller('leagues')
export class LeaguesController {
  constructor(
    @Inject(forwardRef(() => LeaguesService))
    private readonly leaguesService: LeaguesService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAll() {
    return this.leaguesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ) {
    return this.leaguesService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.leaguesService.remove(id);
  }
}
