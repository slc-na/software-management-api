import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateMasterOnRoomInput } from "src/modules/master-on-rooms/dto/create-master-on-room.input";
import { DeleteMasterOnRoomInput } from "src/modules/master-on-rooms/dto/delete-master-on-room.input";
import { SelectMasterOnRoomByIdInput } from "src/modules/master-on-rooms/dto/select-master-on-room-by-id.input";
import { UpdateMasterOnRoomInput } from "src/modules/master-on-rooms/dto/update-master-on-room.input";
import { MasterOnRoom } from "src/modules/master-on-rooms/master-on-rooms.model";
import { MasterOnRoomsService } from "src/modules/master-on-rooms/master-on-rooms.service";

@Resolver()
export class MasterOnRoomsResolver {
  constructor(private readonly masterOnRoomsService: MasterOnRoomsService) {}

  @Query(() => [MasterOnRoom])
  async getMasterOnRooms() {
    return this.masterOnRoomsService.getMasterOnRooms();
  }

  @Query(() => MasterOnRoom)
  async getMasterOnRoomById(@Args('selectMasterOnRoomByIdInput') selectMasterOnRoomByIdInput: SelectMasterOnRoomByIdInput) {
    return this.masterOnRoomsService.getMasterOnRoomById(selectMasterOnRoomByIdInput);
  }

  @Mutation(() => MasterOnRoom)
  async createMasterOnRoom(@Args('createMasterOnRoomInput') createMasterOnRoomInput: CreateMasterOnRoomInput) {
    return this.masterOnRoomsService.createMasterOnRoom(createMasterOnRoomInput);
  }

  @Mutation(() => MasterOnRoom)
  async updateMasterOnRoom(@Args('updateMasterOnRoomInput') updateMasterOnRoomInput: UpdateMasterOnRoomInput) {
    return this.masterOnRoomsService.updateMasterOnRoom(updateMasterOnRoomInput);
  }

  @Mutation(() => MasterOnRoom)
  async deleteMasterOnRoom(@Args('deleteMasterOnRoomInput') deleteMasterOnRoomInput: DeleteMasterOnRoomInput) {
    return this.masterOnRoomsService.deleteMasterOnRoom(deleteMasterOnRoomInput);
  }
}