import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  /* Environment variables */
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors();

  app.use((req, res, next) => {
    req.user = 'fdjfdhfj';
    next();
  })

  /* Validations */
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  /* Swagger */
  const config = new DocumentBuilder()
    .setTitle('TodosApp - NestJS | MongoDB')
    .setDescription('TodosApp Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.log(`App listening on ${port}`));
}

bootstrap();
