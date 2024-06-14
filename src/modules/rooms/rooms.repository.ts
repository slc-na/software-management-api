import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomsCount } from './rooms-count.model';
import { SelectRoomsInput } from './dto/select-rooms.input';
import { SearchRoomsInput } from './dto/search-rooms.input';
import { CreateRoomInput } from './dto/create-room.input';
import { randomUUID } from 'crypto';
import { RoomsWithCount } from './rooms-with-count.model';
import { GetRoomBySoftwareIdInput } from './dto/get-room-on-software-by-id.input';

@Injectable()
export class RoomsRepository {
  constructor(private prisma: PrismaService) { }

  async createRoom(params: CreateRoomInput): Promise<Room> {
    const { name, semesterId, description } = params;
    const uuid = randomUUID();
    return this.prisma.room.create({
      data: {
        name,
        description: description,
        id: uuid,
        softwareOnRooms: {
          connectOrCreate: {
            where: {
              softwareId_roomId_semesterId: {
                roomId: uuid,
                semesterId: semesterId,
                softwareId: "1",
              }
            },
            create: {
              semesterId: semesterId,
              softwareId: "1"
            }
          }
        }
      },
      include: {
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
    const { search, orderBy, orderDirection, skip, take, semesterId, orderProperty } = selectRoomsInput;
    const where: Prisma.RoomWhereInput = {
      AND: [
        search
          ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
            ],
          }
          : {},
        semesterId
          ? {
            softwareOnRooms: {
              some: {
                semesterId: semesterId
              }
            }
          } : {}
      ],
    };

    const room_query = await this.prisma.room.findMany({
      where,
    });

    const rooms = await this.prisma.room.findMany({
      where: where,
      skip,
      take,
      orderBy: orderBy && !orderProperty
        ? { [orderBy]: orderDirection || 'asc' } : {},
      include: {
        softwareOnRooms: {
          include: {
            room: true,
            semester: true,
            software: {
              select: {
                id: true
              }
            },
          }
        },
        _count: true,
      },
    });

    if (orderProperty) {

      rooms.sort((a, b) => {
        const masterA = a.softwareOnRooms[0]?.[orderBy]?.[orderProperty] || '';
        const masterB = b.softwareOnRooms[0]?.[orderBy]?.[orderProperty] || '';
        if (masterA < masterB) {
          return orderDirection === 'asc' ? -1 : 1;
        }
        if (masterA > masterB) {
          return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });;
    }


    const count = room_query.length;

    return { rooms, count };
  }

  async getRoomById(params: {
    where: Prisma.RoomWhereUniqueInput
  }): Promise<Room> {
    const { where } = params;
    return this.prisma.room.findUnique({
      where,
      include: {
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
        softwareOnRooms: true,
        _count: true,
      },
    });

    const count = rooms.length;

    return { rooms, count };
  }

  async updateRoom(params: UpdateRoomInput): Promise<Room> {
    const { id, name, semesterId, description } = params;
    console.log("params{}", params);

    const res = await this.prisma.room.update({
      where: {
        id: id
      },
      data: {
        name: name,
        description: description,
      },
      include: {
        softwareOnRooms: true,
        _count: true,
      }
    });
    console.log(res);

    return res
  }

  async deleteRoomById(params: {
    where: Prisma.RoomWhereUniqueInput;
  }): Promise<Room> {
    const { where } = params;
    return this.prisma.room.delete({
      where,
      include: {
        softwareOnRooms: true,
        _count: true,
      }
    });
  }

  async getRoomOnSoftwareId(params: GetRoomBySoftwareIdInput): Promise<{ rooms: Room[], counts: number }> {
    const { softwareId, semesterId } = params;
    const res = await this.prisma.room.findMany({
      where: {
        softwareOnRooms: {
          some: {
            softwareId: softwareId,
            semesterId: semesterId
          }
        }
      },
      include: {
        _count: true,
      }
    });

    const count = res.length ? res.length : 0;

    return { rooms: res, counts: count }
  }
}