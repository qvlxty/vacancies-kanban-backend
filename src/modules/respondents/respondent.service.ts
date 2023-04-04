import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRespondentDto } from './dto/createRespondent.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { UpdateRespondentDto } from './dto/updateRespondent.dto';
import { Respondent } from './respondent.entity';

import { promises } from 'fs'
import { sep as pathSeparator } from 'path';

@Injectable()
export class RespondentService {
  constructor(
    @InjectRepository(Respondent)
    private respondentRepository: Repository<Respondent>,
  ) { }
  create(v: CreateRespondentDto) {
    this.respondentRepository.save(v);
  }

  read() {
    return this.respondentRepository.find();
  }

  getOne(id: string) {
    return this.respondentRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: string, data: UpdateRespondentDto) {
    await this.respondentRepository.update({ id: Number(id) }, {
      ...data,
      status: data.status as Respondent['status']
    });
  }

  async updateOrder(data: UpdateOrderDto) {
    await Promise.all(data.orderItems.map(({ id, order }) =>
      this.respondentRepository.update({ id: Number(id) }, { order }))
    )
  }
  async delete(id: string) {
    await this.respondentRepository.delete({ id: Number(id) });
  }

  public async updateCv(id: string, filename: string) {
    const previousRespondent = await this.getOne(id)
    try {
      await promises.unlink(`${process.env.FILES_PATH}${pathSeparator}${previousRespondent.resumeUrl}`)
    } catch (err) {
      console.error('Error during previous cv file:')
      console.error(err)
    }
    return this.respondentRepository.update({
      id: parseInt(id)
    }, {
      resumeUrl: filename
    })
  }

  public timetable(userId: number) {
    return this.respondentRepository.createQueryBuilder('r')
      .where('r.userId = :userId and r.interviewDate > CURRENT_DATE', { userId })
      .orderBy('r.interviewDate', 'ASC')
      .leftJoinAndSelect('r.vacancy', 'v')
      .getMany()
  }
}
