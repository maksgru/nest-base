import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.label({
                label: `\x1b[32m[${config.get('app.name')}]\x1b[0m\x1b[36m`,
              }),
              winston.format.timestamp({
                format: 'YY-MM-DD HH:MM:SS',
              }),
              winston.format.printf(
                info => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
              ),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export default class AppLoggerModule { }
