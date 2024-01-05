import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/create-software-on-room.input";
import { DeleteSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/delete-software-on-room.input";
import { SelectSoftwareOnRoomByIdInput } from "src/modules/software-on-rooms/dto/select-software-on-room-by-id.input";
import { UpdateSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/update-software-on-room.input";
import { SoftwareOnRoom } from "src/modules/software-on-rooms/software-on-rooms.model";
import { SoftwareOnRoomsService } from "src/modules/software-on-rooms/software-on-rooms.service";

@Resolver()
export class SoftwareOnRoomsResolver {
  constructor(private readonly softwareOnRoomsService: SoftwareOnRoomsService) {}

  @Query(() => [SoftwareOnRoom])
  async getSoftwareOnRooms() {
    return this.softwareOnRoomsService.getSoftwareOnRooms();
  }

  @Query(() => SoftwareOnRoom)
  async getSoftwareOnRoomById(@Args('selectSoftwareOnRoomByIdInput') selectSoftwareOnRoomByIdInput: SelectSoftwareOnRoomByIdInput) {
    return this.softwareOnRoomsService.getSoftwareOnRoomById(selectSoftwareOnRoomByIdInput);
  }

  @Mutation(() => SoftwareOnRoom)
  async createSoftwareOnRoom(@Args('createSoftwareOnRoomInput') createSoftwareOnRoomInput: CreateSoftwareOnRoomInput) {
    return this.softwareOnRoomsService.createSoftwareOnRoom(createSoftwareOnRoomInput);
  }

  @Mutation(() => SoftwareOnRoom)
  async updateSoftwareOnRoom(@Args('updateSoftwareOnRoomInput') updateSoftwareOnRoomInput: UpdateSoftwareOnRoomInput) {
    return this.softwareOnRoomsService.updateSoftwareOnRoom(updateSoftwareOnRoomInput);
  }

  @Mutation(() => SoftwareOnRoom)
  async deleteSoftwareOnRoom(@Args('deleteSoftwareOnRoomInput') deleteSoftwareOnRoomInput: DeleteSoftwareOnRoomInput) {
    return this.softwareOnRoomsService.deleteSoftwareOnRoom(deleteSoftwareOnRoomInput);
  }
}