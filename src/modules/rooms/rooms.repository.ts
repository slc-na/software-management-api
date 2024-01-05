import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsRepository {
  constructor(private prisma: PrismaService) {}

  async createRoom(params: {
    data: Prisma.RoomCreateInput 
  }): Promise<Room> {
    const { data } = params;
    return this.prisma.room.create({
      data,
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      }
    })
  }

  async getRooms(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.RoomWhereUniqueInput,
    where?: Prisma.RoomWhereInput,
    orderBy?: Prisma.RoomOrderByWithRelationInput,
  }): Promise<Room[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.room.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }

  async getRoomById(params: {
    where: Prisma.RoomWhereUniqueInput
  }): Promise<Room> {
    const { where } = params;
    return this.prisma.room.findUnique({
      where,
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      }
    })
  }

  async updateRoom(params: UpdateRoomInput): Promise<Room> {
    const { id, name } = params;
    return this.prisma.room.update({
      where: {
        id: id
      },
      data: {
        name: name
      },
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }

  async deleteRoomById(params: {
    where: Prisma.RoomWhereUniqueInput;
  }): Promise<Room> {
    const { where } = params;
    return this.prisma.room.delete({
      where,
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }
}