import { BasicEntity } from 'src/templates/basic-entity.template';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { TeamJoinRequestEntity } from 'src/teams/entities/team-join-request.entity';
import { DominantLeg, PlayerPosition } from 'src/types/enum';

@Entity('players_data')
export class PlayerDataEntity extends BasicEntity {
  @Column({
    type: 'smallint',
    unsigned: true,
  })
  height: number;

  @Column({
    enum: DominantLeg,
    default: DominantLeg.RIGHT,
  })
  dominantLeg: DominantLeg;

  @Column({
    enum: PlayerPosition,
    default: PlayerPosition.ATTACKER,
  })
  position: PlayerPosition;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  number: number;

  @Column({
    type: 'timestamp with time zone',
  })
  dateOfBirth: Date;

  @OneToOne(() => UserEntity, userEntity => userEntity.playerData)
  user: UserEntity;

  @OneToMany(() => TeamEntity, teamEntity => teamEntity.captain, {
    eager: true,
    cascade: true,
  })
  headedTeams: TeamEntity[];

  @ManyToMany(() => TeamEntity, teamEntity => teamEntity.players, {
    eager: true,
    cascade: true,
  })
  teams: TeamEntity[];

  @OneToMany(() => TeamJoinRequestEntity, request => request.player, {
    cascade: true,
  })
  requestsToJoin: TeamJoinRequestEntity[];
}
