import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IMessage } from '../interfaces/message.interface';

@Entity({ name: 'users' })
export default class Message extends BaseEntity implements IMessage {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public text: string;

  @Column({ nullable: false })
  public authorId: number;

  @Column({ nullable: false })
  public receiverId: number;
}