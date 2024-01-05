import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { Master } from "src/modules/Masters/Masters.model";
import { CreateMasterInput } from "src/modules/masters/dto/create-master.input";
import { DeleteMasterInput } from "src/modules/masters/dto/delete-master.input";
import { SelectMasterByIdInput } from "src/modules/masters/dto/select-master-by-id.input";
import { UpdateMasterInput } from "src/modules/masters/dto/update-master.input";
import { MastersService } from "src/modules/masters/masters.service";

@Resolver()
export class MastersResolver {
  constructor(private readonly mastersService: MastersService) {}

  @Query(() => [Master])
  async getMasters() {
    return this.mastersService.getMasters();
  }

  @Query(() => Master)
  async getMasterById(@Args('selectMasterByIdInput') selectMasterByIdInput: SelectMasterByIdInput) {
    return this.mastersService.getMasterById(selectMasterByIdInput);
  }

  @Mutation(() => Master)
  async createMaster(@Args('createMasterInput') createMasterInput: CreateMasterInput) {
    return this.mastersService.createMaster(createMasterInput);
  }

  @Mutation(() => Master)
  async updateMaster(@Args('updateMasterInput') updateMasterInput: UpdateMasterInput) {
    return this.mastersService.updateMaster(updateMasterInput);
  }

  @Mutation(() => Master)
  async deleteMaster(@Args('deleteMasterInput') deleteMasterInput: DeleteMasterInput) {
    return this.mastersService.deleteMaster(deleteMasterInput);
  }
}