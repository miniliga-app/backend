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
  Inject,
  forwardRef,
  Put,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/request/create-player.dto';
import { UpdatePlayerDto } from './dto/request/update-player.dto';
import { PlayerResponseDto } from './dto/response/player-response.dto';

@Controller('players')
export class PlayersController {
  constructor(
    @Inject(forwardRef(() => PlayersService))
    private readonly playersService: PlayersService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<PlayerResponseDto> {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAllPlayers(): Promise<PlayerResponseDto[]> {
    return this.playersService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.FOUND)
  async findOnePlayer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PlayerResponseDto> {
    return this.playersService.findOnePlayer(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updatePlayer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerResponseDto> {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeOnePlayer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.playersService.removeOnePlayer(id);
  }
}
