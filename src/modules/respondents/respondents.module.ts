import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respondent } from './respondent.entity';
import { RespondentService } from './respondent.service';
import { RespondentsController } from './respondents.controller';
import { MulterModule } from '@nestjs/platform-express';
import { createLocalFsStorage } from '../../multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Respondent]),
    MulterModule.register({
      dest: process.env.FILES_PATH,
      storage: createLocalFsStorage
    })
  ],
  controllers: [RespondentsController],
  providers: [RespondentService],
})
export class RespondentModule { }
