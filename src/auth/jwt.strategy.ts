import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService, Environment } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKeyProvider: (request: any, rawJwtToken: any, done: any) => done(null, configService.jwtSecret),
      passReqToCallback: true,
      ignoreExpiration: configService.env !== Environment.production,
    } as StrategyOptions);
  }

  async validate(request: any, payload: JwtPayload, ...other: any[]) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('User token is invalid');
    }
    return user;
  }
}
