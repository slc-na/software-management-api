import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [PrismaModule],
  providers: [RoomsRepository, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
