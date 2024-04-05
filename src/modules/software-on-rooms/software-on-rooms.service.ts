import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SoftwareOnRoom } from "@prisma/client";
import { SoftwareOnRoomsRepository } from "./software-on-rooms.repository";
import { SelectSoftwareOnRoomByIdInput } from "./dto/select-software-on-room-by-id.input";
import { UpdateSoftwareOnRoomInput } from "./dto/update-software-on-room.input";
import { DeleteSoftwareOnRoomInput } from "./dto/delete-software-on-room.input";
import { SoftwareOnRoomBulkInput } from "./dto/software-on-room-bulk-input";
import { BulkUpdateSoftwareByRoom } from "../softwares/dto/bulk-update-software-by-room.input";

@Injectable()
export class SoftwareOnRoomsService {
  constructor(private repository: SoftwareOnRoomsRepository ) {}

  async createSoftwareOnRoom(params: { softwareId: SoftwareOnRoom['softwareId'], roomId: SoftwareOnRoom['roomId'], semesterId: SoftwareOnRoom['semesterId']}) {
    const { softwareId, roomId, semesterId } = params;
    return await this.repository.createSoftwareOnRoom({
      data: {
        software: {
          connect: {
            id: softwareId
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
      }
    });
  }

  async getSoftwareOnRooms() {
    return await this.repository.getSoftwareOnRooms({});
  }

  async getSoftwareOnRoomById(params: SelectSoftwareOnRoomByIdInput) {
    return this.repository.getSoftwareOnRoomById({
      where: {
        softwareId_roomId_semesterId: {
          roomId: params.roomId,
          semesterId: params.semesterId,
          softwareId: params.softwareId,
        }
      },
    });
  }

  async updateSoftwareOnRoom(params: UpdateSoftwareOnRoomInput) {
    return this.repository.updateSoftwareOnRoom(params);
  }

  async deleteSoftwareOnRoom(params: DeleteSoftwareOnRoomInput) {
    return this.repository.deleteSoftwareOnRoomById({
      where: {
        softwareId_roomId_semesterId: {
          roomId: params.roomId,
          semesterId: params.semesterId,
          softwareId: params.softwareId,
        }
      },
    });
  }

  async inputSoftwareRoomBulk(params: SoftwareOnRoomBulkInput) {
    const singleRooms = params.roomIds.length == 1; const singleSoftware = params.softwareIds.length == 1
    
    if(singleRooms || singleSoftware && !(singleRooms && singleSoftware)){
      
      const semester = params.semesterId
      
      if(singleRooms){
        const data:SoftwareOnRoom[] = singleRooms ? 
        params.softwareIds.map((ids) =>({
          softwareId: ids,
          roomId:  params.roomIds[0],
          semesterId: semester,
          updatedAt:null,
          createdAt:null
        })) : 
        params.roomIds.map((ids) =>({
          softwareId: params.softwareIds[0],
          roomId: ids,
          semesterId: semester,
          updatedAt:null,
          createdAt:null
        }))
      return this.repository.createManySoftwareOnRoom(data);
      }

    throw new HttpException("software-Rooms bad input, make sure only pass one multiple array", HttpStatus.BAD_REQUEST);

    }
  }

  async bulkUpdateSoftwareByRoom(params: BulkUpdateSoftwareByRoom){
    const { data, semesterId, roomId } = params
    const mappedData = data.map(software => ({
      software: {
        id: software["softwareId"],
        status: software["status"] 
      }
    }));
    
    this.repository.updateSoftwareByRoom(mappedData, semesterId, roomId);
    
    return data.length

  }
}