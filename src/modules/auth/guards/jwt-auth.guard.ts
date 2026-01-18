import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Header mancante');

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      req.user = payload; // attach user info
      return true;
    } catch {
      throw new UnauthorizedException('Token non valido');
    }
  }
}
