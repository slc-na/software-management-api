import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateGroupInput } from "src/modules/groups/dto/create-group.input";
import { DeleteGroupInput } from "src/modules/groups/dto/delete-group.input";
import { SelectGroupByIdInput } from "src/modules/groups/dto/select-group-by-id.input";
import { UpdateGroupInput } from "src/modules/groups/dto/update-group.input";
import { Group } from "src/modules/groups/groups.model";
import { GroupsService } from "src/modules/groups/groups.service";

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => [Group])
  async getGroups() {
    return this.groupsService.getGroups();
  }

  @Query(() => Group)
  async getGroupById(@Args('selectGroupByIdInput') selectGroupByIdInput: SelectGroupByIdInput) {
    return this.groupsService.getGroupById(selectGroupByIdInput);
  }

  @Mutation(() => Group)
  async createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupsService.createGroup(createGroupInput);
  }

  @Mutation(() => Group)
  async updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupsService.updateGroup(updateGroupInput);
  }

  @Mutation(() => Group)
  async deleteGroup(@Args('deleteGroupInput') deleteGroupInput: DeleteGroupInput) {
    return this.groupsService.deleteGroup(deleteGroupInput);
  }
}