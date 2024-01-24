import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SoftwaresRepository } from './softwares.repository';
import { SoftwaresService } from './softwares.service';

@Module({
  imports: [PrismaModule],
  providers: [SoftwaresRepository, SoftwaresService],
  exports: [SoftwaresService],
})
export class SoftwaresModule {}
