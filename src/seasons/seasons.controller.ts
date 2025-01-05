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
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/request/create-season.dto';
import { UpdateSeasonDto } from './dto/request/update-season.dto';
import { SeasonResponseDto } from './dto/response/season-response.dto';
import { parseUuidPipe } from 'src/pipes';

@Controller('seasons')
export class SeasonsController {
  constructor(
    @Inject(forwardRef(() => SeasonsService))
    private readonly seasonsService: SeasonsService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createSeason(
    @Body() createSeasonDto: CreateSeasonDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.createSeason(createSeasonDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAllSeasons(): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findAllSeasons();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.FOUND)
  async findOneSeason(
    @Param('id', parseUuidPipe) id: string,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.findOneSeason(id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateSeason(
    @Param('id', parseUuidPipe) id: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.updateSeason(id, updateSeasonDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeSeason(@Param('id', parseUuidPipe) id: string): Promise<void> {
    return this.seasonsService.removeSeason(id);
  }
}
