import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { RecapCount } from "src/modules/recaps/dto/recap-count.model";
import { CreateSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/create-software-on-room.input";
import { DeleteSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/delete-software-on-room.input";
import { GetSoftwareByRoomInput } from "src/modules/software-on-rooms/dto/get-software-by-room.input";
import { SelectSoftwareOnRoomByIdInput } from "src/modules/software-on-rooms/dto/select-software-on-room-by-id.input";
import { SoftwareOnRoomBulkInput } from "src/modules/software-on-rooms/dto/software-on-room-bulk-input";
import { UpdateSoftwareOnRoomInput } from "src/modules/software-on-rooms/dto/update-software-on-room.input";
import { SoftwareOnRoom } from "src/modules/software-on-rooms/software-on-rooms.model";
import { SoftwareOnRoomsRepository } from "src/modules/software-on-rooms/software-on-rooms.repository";
import { SoftwareOnRoomsService } from "src/modules/software-on-rooms/software-on-rooms.service";
import { BulkUpdateSoftwareByRoom } from "src/modules/softwares/dto/bulk-update-software-by-room.input";

@Resolver()
export class SoftwareOnRoomsResolver {
  constructor(private readonly softwareOnRoomsService: SoftwareOnRoomsService) {}
  @Query(() => [SoftwareOnRoom])
  async getSoftwareOnRooms() {
    return this.softwareOnRoomsService.getSoftwareOnRooms();
  }
  
  @Query(() => [SoftwareOnRoom])
  async getSoftwareByRoomId(@Args('getSoftwareByRoomInput') getSoftwareByRoomInput: GetSoftwareByRoomInput) {
    return this.softwareOnRoomsService.getSoftwareByRoomId(getSoftwareByRoomInput);
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

  @Mutation(() => SoftwareOnRoom)
  async inputSoftwareRoomBulk(@Args('softwareOnRoomBulkInput') softwareOnRoomBulkInput:SoftwareOnRoomBulkInput){
    return this.softwareOnRoomsService.inputSoftwareRoomBulk(softwareOnRoomBulkInput)
  } 

  @Mutation(() => RecapCount)
  async bulkUpdateSoftwareByRoom(@Args('bulkUpdateSoftwareByRoom') bulkUpdateSoftwareByRoom: BulkUpdateSoftwareByRoom){
    return {count: this.softwareOnRoomsService.bulkUpdateSoftwareByRoom(bulkUpdateSoftwareByRoom)}
  }

}