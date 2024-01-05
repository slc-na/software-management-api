import { Injectable } from "@nestjs/common";
import { Group } from "@prisma/client";
import { GroupsRepository } from "./groups.repository";
import { SelectGroupByIdInput } from "./dto/select-group-by-id.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import { DeleteGroupInput } from "./dto/delete-group.input";

@Injectable()
export class GroupsService {
  constructor(private repository: GroupsRepository) {}

  async createGroup(params: { name: Group['name'] }) {
    const { name } = params;
    return await this.repository.createGroup({
      data: {
        name
      }
    });
  }

  async getGroups() {
    return await this.repository.getGroups({});
  }

  async getGroupById(params: SelectGroupByIdInput) {
    return this.repository.getGroupById({
      where: params
    });
  }

  async updateGroup(params: UpdateGroupInput) {
    return this.repository.updateGroup(params);
  }

  async deleteGroup(params: DeleteGroupInput) {
    return this.repository.deleteGroupById({
      where: {
        id: params.id
      }
    });
  }
}