import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.model';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createUser(@Body() adminData: Admin): Promise<Admin> {
    return this.adminService.createUser(adminData);
  }

  @Post('login')
  async login(
    @Body() loginData: { username: string; password: string },
  ): Promise<{ token: string }> {
    const { username, password } = loginData;
    const token = await this.adminService.authenticate(username, password);

    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { token };
  }

  // TODO - refresh session
}
