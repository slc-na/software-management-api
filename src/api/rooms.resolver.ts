import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateRoomInput } from "src/modules/rooms/dto/create-room.input";
import { DeleteRoomInput } from "src/modules/rooms/dto/delete-room.input";
import { SearchRoomsInput } from "src/modules/rooms/dto/search-rooms.input";
import { SelectRoomByIdInput } from "src/modules/rooms/dto/select-room-by-id.input";
import { SelectRoomsInput } from "src/modules/rooms/dto/select-rooms.input";
import { UpdateRoomInput } from "src/modules/rooms/dto/update-room.input";
import { RoomsCount } from "src/modules/rooms/rooms-count.model";
import { RoomsWithCount } from "src/modules/rooms/rooms-with-count.model";
import { Room } from "src/modules/rooms/rooms.model";
import { RoomsService } from "src/modules/rooms/rooms.service";
import { SearchRoomsResult } from "src/modules/rooms/search-rooms-result.model";

@Resolver()
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(() => RoomsCount)
  async getRoomsCount() {
    return this.roomsService.getRoomsCount();
  }

  @Query(() => RoomsWithCount)
  async getRooms(@Args('selectRoomsInput') selectRoomsInput: SelectRoomsInput) {
    return this.roomsService.getRooms(selectRoomsInput);
  }

  @Query(() => Room)
  async getRoomById(@Args('selectRoomByIdInput') selectRoomByIdInput: SelectRoomByIdInput) {
    return this.roomsService.getRoomById(selectRoomByIdInput);
  }

  @Query(() => SearchRoomsResult)
  async searchRooms(@Args('searchRoomsInput') searchRoomsInput: SearchRoomsInput) {
    return this.roomsService.searchRooms(searchRoomsInput);
  }

  @Mutation(() => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.createRoom(createRoomInput);
  }

  @Mutation(() => Room)
  async updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.updateRoom(updateRoomInput);
  }

  @Mutation(() => Room)
  async deleteRoom(@Args('deleteRoomInput') deleteRoomInput: DeleteRoomInput) {
    return this.roomsService.deleteRoom(deleteRoomInput);
  }
}