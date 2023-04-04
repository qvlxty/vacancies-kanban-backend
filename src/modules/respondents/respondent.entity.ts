import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vacancy } from '../vacancies/vacancy.entity';
import { User } from '../user/user.entity';

@Entity()
export class Respondent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  resumeUrl: string;

  @Column({
    name: 'additionalMessages',
    type: 'text',
    nullable: true
  })
  additionalMessages: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    name: 'essay',
    type: 'text',
    nullable: true
  })
  essay: string;

  @Column({
    name: 'feedback',
    type: 'text',
    nullable: true
  })
  feedback: string;

  @Column({
    name: 'interviewDate',
    type: 'timestamp',
    nullable: true,
    default: null
  })
  interviewDate: Date;

  @Column({
    name: 'order',
    type: 'int',
    nullable: true,
    default: 0,
  })
  order: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Vacancy, (v) => v.respondents, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'vacancy_id',
  })
  vacancy: Vacancy

  @Column({
    type: 'int',
    name: 'vacancy_id',
    nullable: true
  })
  vacancyId: number

  @ManyToOne(() => User, (v) => v.respondents, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: true
  })
  userId: number


  @Column({
    type: 'enum',
    enum: ['cancelled', 'ongoing', 'failed', 'success'],
    default: 'ongoing'
  })
  status: Status
}

export enum Status {
  cancelled = 'cancelled',
  ongoing = 'ongoing',
  failed = 'failed',
  success = 'success',
}