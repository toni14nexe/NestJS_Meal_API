import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
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
