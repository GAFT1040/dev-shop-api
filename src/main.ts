import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as pkg from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(pkg.displayName)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addServer('http://127.0.0.1:3000', 'URl de desenvolvimento!')
    .addBearerAuth()
    .setContact(
      pkg.author,
      'https://github.com/GAFT1040',
      'https://www.linkedin.com/in/gabriel-ferrari-854b302b2/',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
