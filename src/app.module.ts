import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Respondent } from './modules/respondents/respondent.entity';
import { RespondentModule } from './modules/respondents/respondents.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { Vacancy } from './modules/vacancies/vacancy.entity';
import { VacancyModule } from './modules/vacancies/vacancy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(process.env.DB_PASSWORD)
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/api',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Vacancy, Respondent],
        migrations: ['./dist/migrations'],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    VacancyModule,
    RespondentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
