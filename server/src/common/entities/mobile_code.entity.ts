import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { OtpEntity } from './otp.entity';

@Entity('mobile_code')
export class MobileCodeEntity {
  @PrimaryColumn({ type: 'varchar', length: 3, nullable: false })
  mobile_code: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  country: string;

  @OneToMany(() => OtpEntity, (mobile) => mobile.mobile_code)
  mobile: OtpEntity[];
}
