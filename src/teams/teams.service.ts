import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/request/create-team.dto';
import { UpdateTeamDto } from './dto/request/update-team.dto';
import { TeamEntity } from './entities/team.entity';
import { Not } from 'typeorm';

@Injectable()
export class TeamsService {
  async create({ shortName, ...rest }: CreateTeamDto): Promise<TeamEntity> {
    const team = new TeamEntity();

    Object.assign(team, {
      shortName,
      ...rest,
    });

    return await team.save();
  }

  async findAll(): Promise<TeamEntity[]> {
    return await TeamEntity.find();
  }

  async findOne(id: string): Promise<TeamEntity> {
    const team = await TeamEntity.findOneBy({ id });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(
    id: string,
    { shortName, ...rest }: UpdateTeamDto,
  ): Promise<TeamEntity> {
    const isTeamExists = await this.isTeamExists(id);

    if (!isTeamExists)
      throw new NotFoundException('Tried to update non existing team');

    const isShortNameTaken = await this.isShortNameTaken(shortName, id);

    if (isShortNameTaken)
      throw new ConflictException('Short name already taken');

    /**
     * TODO 2: Check if there are not collisions with captain and players (new captain or players are not members of other team in the same league)
     */

    const team = new TeamEntity();

    Object.assign(team, {
      shortName,
      ...rest,
    });

    return await team.save();
  }

  async remove(id: string): Promise<void> {
    const result = await TeamEntity.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException('Tried to remove not existing team');
  }

  async isShortNameTaken(shortName: string): Promise<boolean>;
  async isShortNameTaken(shortName: string, id: string): Promise<boolean>;

  async isShortNameTaken(shortName: string, id?: string): Promise<boolean> {
    return !!(await TeamEntity.findOneBy({
      shortName,
      ...(id && { id: Not(id) }),
    }));
  }

  async isTeamExists(id: string): Promise<boolean> {
    return !!(await this.findOne(id));
  }

  async validateTeam(teamId: string): Promise<TeamEntity> {
    try {
      return await TeamEntity.findOneByOrFail({ id: teamId });
    } catch (error) {
      throw new NotFoundException('Team not found');
    }
  }
}
