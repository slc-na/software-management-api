import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { MasterOnRoomsRepository } from './master-on-rooms.repository';
import { MasterOnRoomsService } from './master-on-rooms.service';

@Module({
  imports: [PrismaModule],
  providers: [MasterOnRoomsRepository, MasterOnRoomsService],
  exports: [MasterOnRoomsService],
})
export class MasterOnRoomsModule {}
