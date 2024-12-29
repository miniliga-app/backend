import { BasicEntity } from 'src/templates/basic-entity.template';
import { LeagueEntity } from 'src/leagues/entities/league.entity';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';
import { TeamJoinRequestEntity } from './team-join-request.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ITeamEntity } from 'src/types/team';

@Entity('teams')
export class TeamEntity extends BasicEntity implements ITeamEntity {
  @Column({
    type: 'varchar',
    length: 3,
  })
  shortName: string;

  @Column({
    type: 'text',
  })
  longName: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  profilePicture: string;

  @ManyToOne(
    () => PlayerDataEntity,
    playerDataEntity => playerDataEntity.headedTeams,
  )
  captain: PlayerDataEntity;

  @ManyToMany(
    () => PlayerDataEntity,
    playerDataEntity => playerDataEntity.teams,
  )
  players: PlayerDataEntity[];

  @ManyToOne(() => LeagueEntity, leagueEntity => leagueEntity.teams)
  league: LeagueEntity;

  @OneToMany(() => TeamJoinRequestEntity, requestEntity => requestEntity.team, {
    cascade: true,
  })
  requestsToJoin: TeamJoinRequestEntity[];
}
