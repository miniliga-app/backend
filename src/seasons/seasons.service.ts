import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeasonDto } from './dto/request/create-season.dto';
import { UpdateSeasonDto } from './dto/request/update-season.dto';
import { SeasonResponseDto } from './dto/response/season-response.dto';
import { SeasonEntity } from './entities/season.entity';

@Injectable()
export class SeasonsService {
  async createSeason(
    createSeasonDto: CreateSeasonDto,
  ): Promise<SeasonResponseDto> {
    return new SeasonEntity();
  }

  async findAllSeasons(): Promise<SeasonResponseDto[]> {
    return [new SeasonEntity()];
  }

  async findOneSeason(id: string): Promise<SeasonResponseDto> {
    try {
      return await SeasonEntity.findOneOrFail({
        relations: ['leagues'],
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Season not found');
    }
  }

  async updateSeason(
    id: string,
    updateSeasonDto: UpdateSeasonDto,
  ): Promise<SeasonResponseDto> {
    return new SeasonEntity();
  }

  async removeSeason(id: string): Promise<void> {
    //
    return;
  }
}
