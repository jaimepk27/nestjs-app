import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ServerPropertiesService } from './server-properties/server-properties.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const serverProperties = app.get(ServerPropertiesService);

  await app.listen(serverProperties.getPort());
}

bootstrap();
