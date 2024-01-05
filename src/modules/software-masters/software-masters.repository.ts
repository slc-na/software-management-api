import { Injectable } from '@nestjs/common';
import { SoftwareMaster, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareMasterInput } from './dto/update-software-master.input';

@Injectable()
export class SoftwareMastersRepository {
  constructor(private prisma: PrismaService) {}

  async createSoftwareMaster(params: {
    data: Prisma.SoftwareMasterCreateInput 
  }): Promise<SoftwareMaster> {
    const { data } = params;
    return this.prisma.softwareMaster.create({
      data,
      include: {
        software: true,
        master: true,
      }
    })
  }

  async getSoftwareMasters(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SoftwareMasterWhereUniqueInput,
    where?: Prisma.SoftwareMasterWhereInput,
    orderBy?: Prisma.SoftwareMasterOrderByWithRelationInput,
  }): Promise<SoftwareMaster[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.softwareMaster.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        software: true,
        master: true,
      }
    });
  }

  async getSoftwareMasterById(params: {
    where: Prisma.SoftwareMasterWhereUniqueInput
  }): Promise<SoftwareMaster> {
    const { where } = params;
    return this.prisma.softwareMaster.findUnique({
      where,
      include: {
        software: true,
        master: true,
      }
    })
  }

  async updateSoftwareMaster(params: UpdateSoftwareMasterInput): Promise<SoftwareMaster> {
    const { softwareId, masterId } = params;
    return this.prisma.softwareMaster.update({
      where: {
        softwareId_masterId: {
          masterId: masterId,
          softwareId: softwareId,
        }
      },
      data: {
        master: {
          connect: {
            id: masterId
          }
        },
        software: {
          connect: {
            id: softwareId
          }
        },
      },
      include: {
        software: true,
        master: true,
      }
    });
  }

  async deleteSoftwareMasterById(params: {
    where: Prisma.SoftwareMasterWhereUniqueInput;
  }): Promise<SoftwareMaster> {
    const { where } = params;
    return this.prisma.softwareMaster.delete({
      where,
      include: {
        software: true,
        master: true,
      }
    });
  }
}