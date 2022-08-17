import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Repository } from 'typeorm';
import User from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly mailService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public create(userData: Partial<User>): Promise<User> {
    return this.userRepository.save(this.userRepository.create(userData));
  }

  public async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  public getUsers(): Promise<User[]> {
    this.logger.info('here is a logger message', { method: 'getUsers' });
    return this.userRepository.find();
  }
}
