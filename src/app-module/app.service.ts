import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import HttpExceptionFilter from '../common/exceptions/exception.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { Reflector } from '@nestjs/core';
import traceIdMiddleware from '../common/middlewares/trace-id-middleware';

@Injectable()
export default class AppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {
  }

  public async configureApp(app: NestFastifyApplication): Promise<void> {
    this.initSwagger(app);
    this.enableValidationPipe(app);
    this.enableGlobalFilters(app);
    this.enableInterceptors(app);
    app.use(traceIdMiddleware);
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ['v1'],
      prefix: false,
    });

    app.setGlobalPrefix('api', {
      exclude: ['health/check', 'metrics'],
    });
  }

  public logStartUpInfo(): void {
    const hostName = this.config.get<string>('app.hostName');
    const swaggerInitMessage = `Swagger doc is running - http://${hostName}/swagger`;
    this.logger.log(swaggerInitMessage, AppService.name);
  }

  public initSwagger(app: NestFastifyApplication): void {
    const swaggerEnabled = this.config.get<boolean>('app.swaggerEnabled');
    if (!swaggerEnabled) return;
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nearby Shop')
      .setDescription('Nearby Shop API documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  public enableValidationPipe(app: NestFastifyApplication): void {
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(Object.values(errors[0].constraints)[0], HttpStatus.BAD_REQUEST);
      },
    }));
  }

  public enableGlobalFilters(app: NestFastifyApplication): void {
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  public enableInterceptors(app: NestFastifyApplication): void {
    app.useGlobalInterceptors(
      new LoggingInterceptor(this.logger),
      new ClassSerializerInterceptor(app.get(Reflector))
    );
  }
}
