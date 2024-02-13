import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './file.entity';

@Entity('file_type')
export class FileTypeEntity {
  @PrimaryGeneratedColumn('increment')
  file_type_id: number;

  @Column({ type: 'varchar', length: 15, nullable: false })
  file_type: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  mime_type: string;

  @OneToMany(() => FileEntity, (file) => file.file_type_id)
  file: FileEntity[];
}
