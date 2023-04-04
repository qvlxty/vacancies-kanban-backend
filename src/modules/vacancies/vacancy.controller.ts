import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacancyService } from './vacancy.service';

@Controller('/vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) { }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateVacancyDto) {
    this.vacancyService.create(data);
    return 'Вакансия создана.';
  }


  @Get('/vacancies')
  @UseGuards(AuthGuard('jwt'))
  async getFullVacancies() {
    return this.vacancyService.getVacanciesWithRespondents()
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getVacancy(@Param('id') id: string) {
    return this.vacancyService.getOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: CreateVacancyDto) {
    await this.vacancyService.update(id, data);
    return 'Вакансия обновлена';
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    await this.vacancyService.delete(id);
    return 'Запись удалена';
  }


}
