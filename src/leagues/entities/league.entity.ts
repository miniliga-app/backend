import { BasicEntity } from 'src/templates/basic-entity.template';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { SeasonEntity } from 'src/seasons/entities/season.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ILeagueEntity } from 'src/types/league';

@Entity('leagues')
export class LeagueEntity extends BasicEntity implements ILeagueEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  profilePicture: string;

  @OneToMany(() => TeamEntity, teamEntity => teamEntity.league, {
    cascade: true,
    eager: true,
  })
  teams: TeamEntity[];

  @ManyToOne(() => SeasonEntity, seasonEntity => seasonEntity.leagues)
  season: SeasonEntity;
}
