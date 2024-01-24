import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
  imports: [PrismaModule],
  providers: [CoursesRepository, CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
