import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/request/create-player.dto';
import { UpdatePlayerDto } from './dto/request/update-player.dto';
import { PlayerResponseDto } from './dto/response/player-response.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<PlayerResponseDto> {
    return this.playersService.create(createPlayerDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAll(): Promise<PlayerResponseDto[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PlayerResponseDto> {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerResponseDto> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.playersService.remove(id);
  }
}
