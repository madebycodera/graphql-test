import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserEntity from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  public isValidPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  findOneByNameForLogin(name: string): Promise<UserEntity> {
    return this.userRepository.findOne(
      { name },
      {
        select: ['id', 'password'],
      },
    );
  }

  findOneById(id: string) {
    return this.userRepository.findOne(id);
  }

  async createUser(user: CreateUserDto) {
    const password = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepository.create({ ...user, password });
    await this.userRepository.save(newUser);
    return newUser;
  }

}
