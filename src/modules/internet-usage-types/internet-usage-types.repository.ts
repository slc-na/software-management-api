import { Injectable } from '@nestjs/common';
import { InternetUsageType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateInternetUsageTypeInput } from './dto/update-internet-usage-type.input';

@Injectable()
export class InternetUsageTypesRepository {
  constructor(private prisma: PrismaService) {}

  async createInternetUsageType(params: {
    data: Prisma.InternetUsageTypeCreateInput 
  }): Promise<InternetUsageType> {
    const { data } = params;
    return this.prisma.internetUsageType.create({
      data,
      include: {
        courses: true,
        _count: true,
      }
    })
  }

  async getInternetUsageTypes(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.InternetUsageTypeWhereUniqueInput,
    where?: Prisma.InternetUsageTypeWhereInput,
    orderBy?: Prisma.InternetUsageTypeOrderByWithRelationInput,
  }): Promise<InternetUsageType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.internetUsageType.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        courses: true,
        _count: true,
      }
    });
  }

  async getInternetUsageTypeById(params: {
    where: Prisma.InternetUsageTypeWhereUniqueInput
  }): Promise<InternetUsageType> {
    const { where } = params;
    return this.prisma.internetUsageType.findUnique({
      where,
      include: {
        courses: true,
        _count: true,
      }
    })
  }

  async updateInternetUsageType(params: UpdateInternetUsageTypeInput): Promise<InternetUsageType> {
    const { id, name } = params;
    return this.prisma.internetUsageType.update({
      where: {
        id: id
      },
      data: {
        name: name
      },
      include: {
        courses: true,
        _count: true,
      }
    });
  }

  async deleteInternetUsageTypeById(params: {
    where: Prisma.InternetUsageTypeWhereUniqueInput;
  }): Promise<InternetUsageType> {
    const { where } = params;
    return this.prisma.internetUsageType.delete({
      where,
      include: {
        courses: true,
        _count: true,
      }
    });
  }
}