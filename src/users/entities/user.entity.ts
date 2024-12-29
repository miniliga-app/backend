// user.entity.ts
import { IUserEntity, UserRole } from 'src/types/user';
import { Column, Entity, OneToOne } from 'typeorm';
import { BasicEntity } from 'src/templates/basic-entity.template';
import { PlayerDataEntity } from 'src/players/entities/player-data.entity';

@Entity('users')
export class UserEntity extends BasicEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  surname: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FAN,
  })
  role: UserRole;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  profilePicture: string;

  @Column({
    type: 'text',
    default: null,
  })
  expoToken: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  currentTokenId: string;

  @OneToOne(() => PlayerDataEntity, playerDataEntity => playerDataEntity.user)
  playerData: PlayerDataEntity;
}
