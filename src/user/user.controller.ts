import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Post('login')
  async login(
    @Body() loginData: { username: string; password: string },
  ): Promise<{ token: string }> {
    const { username, password } = loginData;
    const token = await this.userService.authenticate(username, password);

    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { token };
  }

  // TODO - refresh session
}
