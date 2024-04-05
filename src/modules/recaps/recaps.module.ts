import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { RecapsServices } from './recaps.service';
import { RecapsRepository } from './recaps.repository';
import { SoftwaresModule } from '../softwares/softwares.module';

@Module({
  imports: [PrismaModule],
  providers: [RecapsServices, RecapsRepository,],
  exports: [RecapsServices, RecapsRepository],
})
export class RecapsModule { }
