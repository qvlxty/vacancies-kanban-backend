import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Respondent } from '../respondents/respondent.entity';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'stack',
    type: 'text',
    nullable: true,
  })
  stack: string;

  @Column({
    name: 'isOpen',
    type: 'boolean',
    default: true,
  })
  isOpen: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Respondent, (v) => v.vacancy)
  respondents: Respondent[]
}
