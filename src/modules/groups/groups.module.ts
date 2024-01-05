import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { GroupsRepository } from './groups.repository';
import { GroupsService } from './groups.service';

@Module({
  imports: [PrismaModule],
  providers: [GroupsRepository, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
