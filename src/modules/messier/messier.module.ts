import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { MessierServices } from './messier.service';
import { MessierRepository } from './messier.repository';

@Module({
  imports: [PrismaModule],
  providers: [MessierServices, MessierRepository,],
  exports: [MessierServices, MessierRepository],
})
export class MessierModule { 
  
}
