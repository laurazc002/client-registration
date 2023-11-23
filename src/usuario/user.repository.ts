// client-login.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUsernameAndPassword(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { usuario: username, contraseña: password } });
    return user || null;
  }
}
