import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('app.jwtSecret'),

    }),
    inject: [ConfigService],
  })],
  exports: [JwtModule],
})
export default class AppJwtModule {}
