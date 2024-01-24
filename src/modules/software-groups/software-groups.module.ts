import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SoftwareGroupsRepository } from './software-groups.repository';
import { SoftwareGroupsService } from './software-groups.service';

@Module({
  imports: [PrismaModule],
  providers: [SoftwareGroupsRepository, SoftwareGroupsService],
  exports: [SoftwareGroupsService],
})
export class SoftwareGroupsModule {}
