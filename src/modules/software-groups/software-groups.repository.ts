import { Injectable } from '@nestjs/common';
import { SoftwareGroup, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareGroupInput } from './dto/update-software-group.input';

@Injectable()
export class SoftwareGroupsRepository {
  constructor(private prisma: PrismaService) {}

  async createSoftwareGroup(params: {
    data: Prisma.SoftwareGroupCreateInput 
  }): Promise<SoftwareGroup> {
    const { data } = params;
    return this.prisma.softwareGroup.create({
      data,
      include: {
        software: true,
        group: true,
      }
    })
  }

  async getSoftwareGroups(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SoftwareGroupWhereUniqueInput,
    where?: Prisma.SoftwareGroupWhereInput,
    orderBy?: Prisma.SoftwareGroupOrderByWithRelationInput,
  }): Promise<SoftwareGroup[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.softwareGroup.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        software: true,
        group: true,
      }
    });
  }

  async getSoftwareGroupById(params: {
    where: Prisma.SoftwareGroupWhereUniqueInput
  }): Promise<SoftwareGroup> {
    const { where } = params;
    return this.prisma.softwareGroup.findUnique({
      where,
      include: {
        software: true,
        group: true,
      }
    })
  }

  async updateSoftwareGroup(params: UpdateSoftwareGroupInput): Promise<SoftwareGroup> {
    const { softwareId, groupId } = params;
    return this.prisma.softwareGroup.update({
      where: {
        softwareId_groupId: {
          groupId: groupId,
          softwareId: softwareId,
        }
      },
      data: {
        group: {
          connect: {
            id: groupId
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
        group: true,
      }
    });
  }

  async deleteSoftwareGroupById(params: {
    where: Prisma.SoftwareGroupWhereUniqueInput;
  }): Promise<SoftwareGroup> {
    const { where } = params;
    return this.prisma.softwareGroup.delete({
      where,
      include: {
        software: true,
        group: true,
      }
    });
  }
}