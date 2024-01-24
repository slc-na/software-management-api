import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SoftwareMastersService } from './software-masters.service';
import { SoftwareMastersRepository } from './software-masters.repository';

@Module({
  imports: [PrismaModule],
  providers: [SoftwareMastersRepository, SoftwareMastersService],
  exports: [SoftwareMastersService],
})
export class SoftwareMastersModule {}
