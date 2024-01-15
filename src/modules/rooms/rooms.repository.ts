import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomsCount } from './rooms-count.model';
import { SelectRoomsInput } from './dto/select-rooms.input';
import { SearchRoomsInput } from './dto/search-rooms.input';

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

  async getRoomsCount(): Promise<RoomsCount> {
    const count = await this.prisma.room.count();
    return { count };
  }

  async getRooms(selectRoomsInput: SelectRoomsInput): Promise<{ rooms: Room[]; count: number }> {
    const { search, orderBy, orderDirection, skip, take } = selectRoomsInput;

    const where: Prisma.RoomWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            // Add more fields to search if needed
          ],
        }
      : {};

    const rooms = await this.prisma.room.findMany({
      where: where, 
      orderBy: orderBy
        ? {
            [orderBy]: orderDirection || 'asc', // Default to 'asc' if orderDirection is not provided
          }
        : undefined,
      skip,
      take,
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      },
    });

    const count = rooms.length;

    return {rooms, count};
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

  async searchRooms(params: SearchRoomsInput): Promise<{ rooms: Room[]; count: number }> {
    const rooms = await this.prisma.room.findMany({
      where: {
        OR: [
          { name: { contains: params.query, mode: 'insensitive' } },
        ],
      },
      include: {
        masterOnRooms: true,
        softwareOnRooms: true,
        _count: true,
      },
    });

    const count = rooms.length;

    return { rooms, count };
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