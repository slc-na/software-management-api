import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { DepartmentsRepository } from './departments.repository';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [PrismaModule],
  providers: [DepartmentsRepository, DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
