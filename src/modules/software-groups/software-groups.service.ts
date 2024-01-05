import { Injectable } from "@nestjs/common";
import { SoftwareGroup } from "@prisma/client";
import { SoftwareGroupsRepository } from "./software-groups.repository";
import { SelectSoftwareGroupByIdInput } from "./dto/select-software-group-by-id.input";
import { UpdateSoftwareGroupInput } from "./dto/update-software-group.input";
import { DeleteSoftwareGroupInput } from "./dto/delete-software-group.input";

@Injectable()
export class SoftwareGroupsService {
  constructor(private repository: SoftwareGroupsRepository) {}

  async createSoftwareGroup(params: { softwareId: SoftwareGroup['softwareId'], groupId: SoftwareGroup['groupId']}) {
    const { softwareId, groupId } = params;
    return await this.repository.createSoftwareGroup({
      data: {
        software: {
          connect: {
            id: softwareId
          }
        },
        group: {
          connect: {
            id: groupId
          }
        },
      }
    });
  }

  async getSoftwareGroups() {
    return await this.repository.getSoftwareGroups({});
  }

  async getSoftwareGroupById(params: SelectSoftwareGroupByIdInput) {
    return this.repository.getSoftwareGroupById({
      where: {
        softwareId_groupId: {
          groupId: params.groupId,
          softwareId: params.softwareId,
        }
      },
    });
  }

  async updateSoftwareGroup(params: UpdateSoftwareGroupInput) {
    return this.repository.updateSoftwareGroup(params);
  }

  async deleteSoftwareGroup(params: DeleteSoftwareGroupInput) {
    return this.repository.deleteSoftwareGroupById({
      where: {
        softwareId_groupId: {
          groupId: params.groupId,
          softwareId: params.softwareId,
        }
      },
    });
  }
}