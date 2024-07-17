import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessierRepository {
    constructor(private prisma: PrismaService) { }

    

} 