import { Module } from '@nestjs/common';
import AppLoggerModule from '../common/modules/logger/app-logger.module';
import AppConfigModule from '../common/modules/config/app-config.module';
import AppMailerModule from '../common/modules/mailer/app-mailer.module';
import DatabaseModule from '../database/database.module';
import UserModule from '../modules/user/user.module';
import AppService from './app.service';
import { HealthModule } from '../common/modules/health/health.module';
import AuthModule from '../modules/auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    HealthModule,
    AppLoggerModule,
    AppMailerModule,
    AuthModule,
    UserModule,
  ],
  providers: [AppService],
})
export default class AppModule {}
