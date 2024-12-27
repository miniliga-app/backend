import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/request/create-league.dto';
import { UpdateLeagueDto } from './dto/request/update-league.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post('/')
  async create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }

  @Get('/')
  async findAll() {
    return this.leaguesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ) {
    return this.leaguesService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.leaguesService.remove(id);
  }
}
