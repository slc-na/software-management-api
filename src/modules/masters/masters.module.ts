import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { MastersRepository } from './masters.repository';
import { MastersService } from './masters.service';

@Module({
  imports: [PrismaModule],
  providers: [MastersRepository, MastersService],
  exports: [MastersService],
})
export class MastersModule {}
