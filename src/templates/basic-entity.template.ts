import { IBasicEntity } from 'src/types/db';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ColumnOptions,
  PrimaryColumn,
  Generated,
} from 'typeorm';

const timeColumnSettings: ColumnOptions = {
  type: 'timestamp with time zone',
};

export abstract class BasicEntity extends BaseEntity implements IBasicEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @CreateDateColumn(timeColumnSettings)
  createdAt: Date;

  @UpdateDateColumn(timeColumnSettings)
  updatedAt: Date;

  @DeleteDateColumn(timeColumnSettings)
  deletedAt: Date;
}
