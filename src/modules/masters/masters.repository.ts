import { Injectable } from '@nestjs/common';
import { Master, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateMasterInput } from './dto/update-master.input';

@Injectable()
export class MastersRepository {
  constructor(private prisma: PrismaService) {}

  async createMaster(params: {
    data: Prisma.MasterCreateInput 
  }): Promise<Master> {
    const { data } = params;
    return this.prisma.master.create({
      data,
      include: {
        softwareMasters: true,
        masterOnRooms: true,
        _count: true,
      }
    })
  }

  async getMasters(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.MasterWhereUniqueInput,
    where?: Prisma.MasterWhereInput,
    orderBy?: Prisma.MasterOrderByWithRelationInput,
  }): Promise<Master[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.master.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        softwareMasters: true,
        masterOnRooms: true,
        _count: true,
      }
    });
  }

  async getMasterById(params: {
    where: Prisma.MasterWhereUniqueInput
  }): Promise<Master> {
    const { where } = params;
    return this.prisma.master.findUnique({
      where,
      include: {
        softwareMasters: true,
        masterOnRooms: true,
        _count: true,
      }
    })
  }

  async updateMaster(params: UpdateMasterInput): Promise<Master> {
    const { id, name } = params;
    return this.prisma.master.update({
      where: {
        id: id
      },
      data: {
        name: name
      },
      include: {
        softwareMasters: true,
        masterOnRooms: true,
        _count: true,
      }
    });
  }

  async deleteMasterById(params: {
    where: Prisma.MasterWhereUniqueInput;
  }): Promise<Master> {
    const { where } = params;
    return this.prisma.master.delete({
      where,
      include: {
        softwareMasters: true,
        masterOnRooms: true,
        _count: true,
      }
    });
  }
}