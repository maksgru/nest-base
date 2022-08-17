import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppModule from './app-module/app.module';
import AppService from './app-module/app.service';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const appService = app.get(AppService);
  await appService.configureApp(app);
  await app.listen(process.env.PORT || 4000, '0.0.0.0');
  appService.logStartUpInfo();
}
bootstrap();
