import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';
import MAIL_CONSTANTS from '../../../common/constants/mail.constants';

@Module({
  imports: [MailerModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      transport: {
        service: config.get<string>('mail.service'),
        auth: {
          user: config.get<string>('mail.user'),
          pass: config.get<string>('mail.pass'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: config.get<string>('mail.user'),
      },
      template: {
        adapter: new EjsAdapter(),
        dir: path.join(process.cwd(), MAIL_CONSTANTS.TEMPLATE_DIR),
      },
    }),
    inject: [ConfigService],
  })],
  exports: [AppMailerModule],
})
export default class AppMailerModule {}
