import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SoftwareOnRoomsService } from './software-on-rooms.service';
import { SoftwareOnRoomsRepository } from './software-on-rooms.repository';

@Module({
  imports: [PrismaModule],
  providers: [SoftwareOnRoomsRepository, SoftwareOnRoomsService],
  exports: [SoftwareOnRoomsService],
})
export class SoftwareOnRoomsModule {}
