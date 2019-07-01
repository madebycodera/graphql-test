import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginDataDto } from '../user/dto/login-data.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import UserEntity from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {
  }

  async signIn(login: LoginUserDto): Promise<LoginDataDto> {
    const user = await this.usersService.findOneByNameForLogin(login.name);
    if (!user || (await this.usersService.isValidPassword(login.password, user.password)) === false) {
      throw new UnauthorizedException();
    }
    return this.signInUser(user);
  }

  async signInUser(user: UserEntity): Promise<LoginDataDto> {
    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneById(payload.id);
  }
}
