import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SemestersRepository } from './semesters.repository';
import { SemestersService } from './semesters.service';

@Module({
  imports: [PrismaModule],
  providers: [SemestersRepository, SemestersService],
  exports: [SemestersService],
})
export class SemestersModule {}
