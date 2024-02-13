import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileTypeEntity } from './file_type.entity';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn('increment')
  file_id: number;

  @Column({ type: 'text', nullable: false })
  path: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  domain: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => FileTypeEntity, (fileType) => fileType.file, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'file_type_id' })
  file_type_id: FileTypeEntity;
}
