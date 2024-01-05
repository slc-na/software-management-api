import { Injectable } from "@nestjs/common";
import { SoftwareOnRoom } from "@prisma/client";
import { SoftwareOnRoomsRepository } from "./software-on-rooms.repository";
import { SelectSoftwareOnRoomByIdInput } from "./dto/select-software-on-room-by-id.input";
import { UpdateSoftwareOnRoomInput } from "./dto/update-software-on-room.input";
import { DeleteSoftwareOnRoomInput } from "./dto/delete-software-on-room.input";

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
}