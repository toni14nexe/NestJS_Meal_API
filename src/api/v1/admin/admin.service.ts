import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Admin } from './admin.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createUser(admin: Admin): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    return this.prisma.admin.create({
      data: { ...admin, password: hashedPassword },
    });
  }

  async getUserByUsername(username: string): Promise<Admin | null> {
    return this.prisma.admin.findUnique({
      where: { username },
    });
  }

  async authenticate(username: string, password: string): Promise<string> {
    const user = await this.getUserByUsername(username);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user || !passwordMatch)
      throw new UnauthorizedException('Invalid credentials');

    const secretKey = this.configService.get<string>('TOKEN_SECRET_KEY');
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: '1h',
    });
    return token;
  }

  // TODO - refresh session
}
