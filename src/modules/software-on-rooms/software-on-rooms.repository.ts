import { Injectable } from '@nestjs/common';
import { SoftwareOnRoom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareOnRoomInput } from './dto/update-software-on-room.input';
import { GetSoftwareByRoomInput } from './dto/get-software-by-room.input';

@Injectable()
export class SoftwareOnRoomsRepository {

  constructor(private prisma: PrismaService) {}

  async createSoftwareOnRoom(params: {
    data: Prisma.SoftwareOnRoomCreateInput 
  }): Promise<SoftwareOnRoom> {
    const { data } = params;
    return this.prisma.softwareOnRoom.create({
      data,
      include: {
        software: true,
        room: true,
        semester: true,
      }
    })
  }

  async getSoftwareOnRooms(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SoftwareOnRoomWhereUniqueInput,
    where?: Prisma.SoftwareOnRoomWhereInput,
    orderBy?: Prisma.SoftwareOnRoomOrderByWithRelationInput,
  }): Promise<SoftwareOnRoom[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.softwareOnRoom.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        software: true,
        semester: true,
        room: true,
      }
    });
  }

  async getSoftwareByRoomId(params:GetSoftwareByRoomInput): Promise<SoftwareOnRoom[]>{

    const res =  this.prisma.softwareOnRoom.findMany({
      where:{
        roomId: params.roomId,
        semesterId: params.semesterId
      }
    })

    return res

  }

  async getSoftwareOnRoomById(params: {
    where: Prisma.SoftwareOnRoomWhereUniqueInput
  }): Promise<SoftwareOnRoom> {
    const { where } = params;
    return this.prisma.softwareOnRoom.findUnique({
      where,
      include: {
        software: true,
        room: true,
        semester: true,
      }
    })
  }

  async updateSoftwareOnRoom(params: UpdateSoftwareOnRoomInput): Promise<SoftwareOnRoom> {
    const { softwareId, semesterId, roomId } = params;
    return this.prisma.softwareOnRoom.update({
      where: {
        softwareId_roomId_semesterId: {
          roomId: roomId,
          semesterId: semesterId,
          softwareId: softwareId,
        }
      },
      data: {
        room: {
          connect: {
            id: roomId
          }
        },
        software: {
          connect: {
            id: softwareId
          }
        },
        semester: {
          connect: {
            id: semesterId
          }
        }
      },
      include: {
        software: true,
        semester: true,
        room: true,
      }
    });
  }

  async deleteSoftwareOnRoomById(params: {
    where: Prisma.SoftwareOnRoomWhereUniqueInput;
  }): Promise<SoftwareOnRoom> {
    const { where } = params;
    return this.prisma.softwareOnRoom.delete({
      where,
      include: {
        software: true,
        semester: true,
        room: true,
      }
    });
  }

  createManySoftwareOnRoom(params: SoftwareOnRoom[]) {
    return this.prisma.softwareOnRoom.createMany({
      data:params
    })
  }

  
  async updateSoftwareByRoom(mappedData: { software: { id: any; status: any; }; }[], semesterId: string, roomId: string) {

    const res = mappedData.map(async data => {
      
      const params = {
        room: { connect: { id: roomId } },
        semester: { connect: { id: semesterId } },
        software: { connect: { id: data.software.id } }
      }

      const condition = {
        roomId: roomId,
        semesterId: semesterId,
        softwareId: data.software.id
      }

      if (data.software.status) {
        await this.prisma.softwareOnRoom.upsert({
          where: {
            softwareId_roomId_semesterId: condition
          },
          create: params,
          update: params
        });
      } else {
        await this.prisma.softwareOnRoom.delete({
          where: {
            softwareId_roomId_semesterId: condition
          }
        })
      }
    });

  }
}