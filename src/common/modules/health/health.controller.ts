import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('/db')
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
    ]);
  }
}
