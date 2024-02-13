import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { MobileCodeEntity } from './mobile_code.entity';

@Entity('otp')
export class OtpEntity {
  @PrimaryColumn({ type: 'varchar', length: 10, nullable: false })
  mobile: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  otp: string;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  expires: string;

  @Column({ type: 'boolean', nullable: false, default: 0 })
  isUsed: boolean;

  @ManyToOne(() => MobileCodeEntity, (mobile_code) => mobile_code.mobile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mobile_code' })
  mobile_code: MobileCodeEntity;
}
