import { Injectable } from '@nestjs/common';
import { Group, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateGroupInput } from './dto/update-group.input';

@Injectable()
export class GroupsRepository {
  constructor(private prisma: PrismaService) {}

  async createGroup(params: {
    data: Prisma.GroupCreateInput 
  }): Promise<Group> {
    const { data } = params;
    return this.prisma.group.create({
      data
    })
  }

  async getGroups(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.GroupWhereUniqueInput,
    where?: Prisma.GroupWhereInput,
    orderBy?: Prisma.GroupOrderByWithRelationInput,
  }): Promise<Group[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.group.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
    });
  }

  async getGroupById(params: {
    where: Prisma.GroupWhereUniqueInput
  }): Promise<Group> {
    const { where } = params;
    return this.prisma.group.findUnique({
      where,
    })
  }

  async updateGroup(params: UpdateGroupInput): Promise<Group> {
    const { id, name } = params;
    return this.prisma.group.update({
      where: {
        id: id
      },
      data: {
        name: name
      },
    });
  }

  async deleteGroupById(params: {
    where: Prisma.GroupWhereUniqueInput;
  }): Promise<Group> {
    const { where } = params;
    return this.prisma.group.delete({
      where,
    });
  }
}