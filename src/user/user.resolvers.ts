import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
@Resolver('User')
export class UsersResolvers {
  constructor(private readonly authService: AuthService, private readonly usersService: UserService) {
  }

  @Query('me')
  @UseGuards(GqlAuthGuard)
  async me(root: any, args: any, context: any) {
    return context.req.user;
  }

  @Mutation()
  async login(@Args('input') login: LoginUserDto) {
    return this.authService.signIn(login);
  }

  @Mutation('createUser')
  create(@Args('input') user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
