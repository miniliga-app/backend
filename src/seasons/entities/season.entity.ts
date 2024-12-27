import { BasicEntity } from 'src/templates/basic-entity.template';
import { LeagueEntity } from 'src/leagues/entities/league.entity';
import { ISeasonEntity } from 'src/types/season';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity('seasons')
export class SeasonEntity extends BasicEntity implements ISeasonEntity {
  @Column({
    type: 'timestamp with time zone',
  })
  startDate: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  endDate: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  profilePicture: string;

  @OneToMany(type => LeagueEntity, leagueEntity => leagueEntity.season, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  leagues: LeagueEntity[];
}
