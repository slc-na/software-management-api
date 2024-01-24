import { Injectable } from "@nestjs/common";
import { MasterOnRoom } from "@prisma/client";
import { MasterOnRoomsRepository } from "./master-on-rooms.repository";
import { SelectMasterOnRoomByIdInput } from "./dto/select-master-on-room-by-id.input";
import { UpdateMasterOnRoomInput } from "./dto/update-master-on-room.input";
import { DeleteMasterOnRoomInput } from "./dto/delete-master-on-room.input";

@Injectable()
export class MasterOnRoomsService {
  constructor(private repository: MasterOnRoomsRepository) {}

  async createMasterOnRoom(params: { masterId: MasterOnRoom['masterId'], roomId: MasterOnRoom['roomId'], semesterId: MasterOnRoom['semesterId'] }) {
    const { masterId, roomId, semesterId } = params;
    return await this.repository.createMasterOnRoom({
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
      }
    });
  }

  async getMasterOnRooms() {
    return await this.repository.getMasterOnRooms({});
  }

  async getMasterOnRoomById(params: SelectMasterOnRoomByIdInput) {
    return this.repository.getMasterOnRoomById({
      where: {
        masterId_roomId_semesterId: {
          masterId: params.masterId,
          roomId: params.roomId,
          semesterId: params.semesterId
        }
      }
    });
  }

  async updateMasterOnRoom(params: UpdateMasterOnRoomInput) {
    return this.repository.updateMasterOnRoom(params);
  }

  async deleteMasterOnRoom(params: DeleteMasterOnRoomInput) {
    return this.repository.deleteMasterOnRoomById({
      where: {
        masterId_roomId_semesterId: {
          masterId: params.masterId,
          roomId: params.roomId,
          semesterId: params.semesterId
        }
      }
    });
  }
}