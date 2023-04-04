import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRespondentDto } from './dto/createRespondent.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { UpdateRespondentDto } from './dto/updateRespondent.dto';
import { RespondentService } from './respondent.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/respondents')
export class RespondentsController {
  constructor(private readonly respondentService: RespondentService) { }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateRespondentDto) {
    this.respondentService.create(data);
    return 'Вакансия создана.';
  }

  @Get('/timetable')
  @UseGuards(AuthGuard('jwt'))
  timetable(@Req() req) {
    return this.respondentService.timetable(req.user.id)
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  read() {
    return this.respondentService.read();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getrespondent(@Param('id') id: string) {
    return this.respondentService.getOne(id);
  }

  @Patch('/order')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() data: UpdateOrderDto) {
    await this.respondentService.updateOrder(data);
    return 'Респонтент обновлен';
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async order(@Param('id') id: string, @Body() data: UpdateRespondentDto) {
    await this.respondentService.update(id, data);
    return 'Респонтент обновлен';
  }

  @Post('/uploadCV/:resId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('resId') resId: string) {
    await this.respondentService.updateCv(resId, file.filename)
    return 'Респондент обновлен'
  }


  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    await this.respondentService.delete(id);
    return 'Запись удалена';
  }

}
