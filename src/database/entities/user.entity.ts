import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountStatusEnum } from '../enums/account-status.enum';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public login: string;

  @Column({ select: false })
  public passwordHash: string;

  @Column()
  public email: string;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.REGISTERED,
  })
  public accountStatus: AccountStatusEnum;

  @Column({ nullable: true })
  public phone: string;

  @Column()
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ nullable: true })
  public fatherName: string;
}
