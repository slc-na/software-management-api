import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateSoftwareGroupInput } from "src/modules/software-groups/dto/create-software-group.input";
import { DeleteSoftwareGroupInput } from "src/modules/software-groups/dto/delete-software-group.input";
import { SelectSoftwareGroupByIdInput } from "src/modules/software-groups/dto/select-software-group-by-id.input";
import { UpdateSoftwareGroupInput } from "src/modules/software-groups/dto/update-software-group.input";
import { SoftwareGroup } from "src/modules/software-groups/software-groups.model";
import { SoftwareGroupsService } from "src/modules/software-groups/software-groups.service";

@Resolver()
export class SoftwareGroupsResolver {
  constructor(private readonly softwareGroupsService: SoftwareGroupsService) {}

  @Query(() => [SoftwareGroup])
  async getSoftwareGroups() {
    return this.softwareGroupsService.getSoftwareGroups();
  }

  @Query(() => SoftwareGroup)
  async getSoftwareGroupById(@Args('selectSoftwareGroupByIdInput') selectSoftwareGroupByIdInput: SelectSoftwareGroupByIdInput) {
    return this.softwareGroupsService.getSoftwareGroupById(selectSoftwareGroupByIdInput);
  }

  @Mutation(() => SoftwareGroup)
  async createSoftwareGroup(@Args('createSoftwareGroupInput') createSoftwareGroupInput: CreateSoftwareGroupInput) {
    return this.softwareGroupsService.createSoftwareGroup(createSoftwareGroupInput);
  }

  @Mutation(() => SoftwareGroup)
  async updateSoftwareGroup(@Args('updateSoftwareGroupInput') updateSoftwareGroupInput: UpdateSoftwareGroupInput) {
    return this.softwareGroupsService.updateSoftwareGroup(updateSoftwareGroupInput);
  }

  @Mutation(() => SoftwareGroup)
  async deleteSoftwareGroup(@Args('deleteSoftwareGroupInput') deleteSoftwareGroupInput: DeleteSoftwareGroupInput) {
    return this.softwareGroupsService.deleteSoftwareGroup(deleteSoftwareGroupInput);
  }
}