import { Module } from '@nestjs/common';
import { MifidService } from './mifid.service';
import { MifidController } from './mifid.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [MifidService],
  controllers: [MifidController],
  exports: [MifidService],
})
export class MifidModule {}
