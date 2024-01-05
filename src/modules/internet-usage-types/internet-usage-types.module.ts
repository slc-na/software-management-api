import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { InternetUsageTypesRepository } from './internet-usage-types.repository';
import { InternetUsageTypesService } from './internet-usage-types.service';

@Module({
  imports: [PrismaModule],
  providers: [InternetUsageTypesRepository, InternetUsageTypesService],
  exports: [InternetUsageTypesService],
})
export class InternetUsageTypesModule {}
