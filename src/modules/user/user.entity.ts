import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Respondent } from '../respondents/respondent.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  fio: string;

  @Column()
  password: string;


  @OneToMany(() => Respondent, (v) => v.user)
  respondents: Respondent[]
}
