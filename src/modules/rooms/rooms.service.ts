import { Injectable } from "@nestjs/common";
import { Room } from "@prisma/client";
import { RoomsRepository } from "./rooms.repository";
import { SelectRoomByIdInput } from "./dto/select-room-by-id.input";
import { UpdateRoomInput } from "./dto/update-room.input";
import { DeleteRoomInput } from "./dto/delete-room.input";
import { SelectRoomsInput } from "./dto/select-rooms.input";

@Injectable()
export class RoomsService {
  constructor(private repository: RoomsRepository) {}

  async createRoom(params: { name: Room['name'] }) {
    const { name } = params;
    return await this.repository.createRoom({
      data: {
        name
      }
    });
  }

  async getRooms(params: SelectRoomsInput) {
    return await this.repository.getRooms(params);
  }

  async getRoomById(params: SelectRoomByIdInput) {
    return this.repository.getRoomById({
      where: params
    });
  }

  async updateRoom(params: UpdateRoomInput) {
    return this.repository.updateRoom(params);
  }

  async deleteRoom(params: DeleteRoomInput) {
    return this.repository.deleteRoomById({
      where: {
        id: params.id
      }
    });
  }
}