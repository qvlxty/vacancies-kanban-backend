import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respondent } from '../respondents/respondent.entity';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    @InjectRepository(Respondent)
    private respondentRepo: Repository<Respondent>,
  ) { }
  create(v: CreateVacancyDto) {
    this.vacancyRepository.save(v);
  }

  getOne(id: string) {
    return this.vacancyRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: string, data: UpdateVacancyDto) {
    await this.vacancyRepository.update({ id: Number(id) }, data);
  }
  async delete(id: string) {

    await this.vacancyRepository.delete({ id: Number(id) });
    await this.respondentRepo.update({ vacancyId: parseInt(id) }, { vacancyId: null })
  }

  getVacanciesWithRespondents() {
    const baseSelectedRows = [
      'u.id', 'u.fio', 'u.login',
      'r.id', 'r.title', 'r.status', 'r.interviewDate', 'r.resumeUrl'
    ]
    return Promise.all(
      [
        this.vacancyRepository
          .createQueryBuilder('v')
          .leftJoinAndSelect('v.respondents', 'r')
          .orderBy('v.id')
          .addOrderBy('r.order')
          .leftJoin('r.user', 'u')
          .select([...baseSelectedRows, 'v.id', 'v.title', 'v.stack', 'v.isOpen'])
          .getMany(),
        this.respondentRepo
          .createQueryBuilder('r')
          .where('r.vacancy_id is null')
          .addOrderBy('r.order')
          .leftJoin('r.user', 'u')
          .select(baseSelectedRows)
          .getMany()
      ]
    )
  }


}
