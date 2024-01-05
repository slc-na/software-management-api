import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SoftwareCoursesRepository } from './software-courses.repository';
import { SoftwareCoursesService } from './software-courses.service';

@Module({
  imports: [PrismaModule],
  providers: [SoftwareCoursesRepository, SoftwareCoursesService],
  exports: [SoftwareCoursesService],
})
export class SoftwareCoursesModule {}
