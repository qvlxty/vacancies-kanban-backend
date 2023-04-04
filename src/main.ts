import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger openapi generator part
  const config = new DocumentBuilder()
    .setTitle('Vacancies API')
    .setDescription('API for Vacancies service')
    .setVersion('1.0')
    .setBasePath('/api/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Подключение пайпа валидации
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  console.log(app.get(ConfigService).get('DB_PASSWORD2'))
  await app.listen(3000);
}
bootstrap();
