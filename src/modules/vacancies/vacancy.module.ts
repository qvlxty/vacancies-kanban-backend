import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respondent } from '../respondents/respondent.entity';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from './vacancy.entity';
import { VacancyService } from './vacancy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy, Respondent])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacancyModule { }
