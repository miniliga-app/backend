import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from './team.entity';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { BasicEntity } from 'src/templates/basic-entity.template';

@Entity('team_join_requests')
export class TeamJoinRequestEntity extends BasicEntity {
  @ManyToOne(() => TeamEntity, teamEntity => teamEntity.requestsToJoin, {
    onDelete: 'CASCADE',
  })
  team: TeamEntity;

  @ManyToOne(
    () => PlayerDataEntity,
    playerDataEntity => playerDataEntity.requestsToJoin,
    {
      onDelete: 'CASCADE',
    },
  )
  player: PlayerDataEntity;
}
