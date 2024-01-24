import { Injectable } from '@nestjs/common';
import { MasterOnRoom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateMasterOnRoomInput } from './dto/update-master-on-room.input';

@Injectable()
export class MasterOnRoomsRepository {
  constructor(private prisma: PrismaService) {}

  async createMasterOnRoom(params: {
    data: Prisma.MasterOnRoomCreateInput 
  }): Promise<MasterOnRoom> {
    const { data } = params;
    return this.prisma.masterOnRoom.create({
      data,
      include: {
        master: true,
        room: true,
        semester: true,
      }
    })
  }

  async getMasterOnRooms(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.MasterOnRoomWhereUniqueInput,
    where?: Prisma.MasterOnRoomWhereInput,
    orderBy?: Prisma.MasterOnRoomOrderByWithRelationInput,
  }): Promise<MasterOnRoom[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.masterOnRoom.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        master: true,
        room: true,
        semester: true,
      }
    });
  }

  async getMasterOnRoomById(params: {
    where: Prisma.MasterOnRoomWhereUniqueInput
  }): Promise<MasterOnRoom> {
    const { where } = params;
    return this.prisma.masterOnRoom.findUnique({
      where,
      include: {
        master: true,
        room: true,
        semester: true,
      }
    })
  }

  async updateMasterOnRoom(params: UpdateMasterOnRoomInput): Promise<MasterOnRoom> {
    const { masterId, roomId, semesterId } = params;
    return this.prisma.masterOnRoom.update({
      where: {
        masterId_roomId_semesterId: {
          masterId: masterId,
          roomId: roomId,
          semesterId: semesterId,
        }
      },
      data: {
        master: {
          connect: {
            id: masterId
          }
        },
        room: {
          connect: {
            id: roomId
          }
        },
        semester: {
          connect: {
            id: semesterId
          }
        }
      },
      include: {
        master: true,
        room: true,
        semester: true,
      }
    });
  }

  async deleteMasterOnRoomById(params: {
    where: Prisma.MasterOnRoomWhereUniqueInput;
  }): Promise<MasterOnRoom> {
    const { where } = params;
    return this.prisma.masterOnRoom.delete({
      where,
      include: {
        master: true,
        room: true,
        semester: true,
      }
    });
  }
}