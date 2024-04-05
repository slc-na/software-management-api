import { Injectable } from "@nestjs/common";
import { Master } from "@prisma/client";
import { MastersRepository } from "./masters.repository";
import { UpdateMasterInput } from "./dto/update-master.input";
import { SelectMasterByIdInput } from "./dto/select-master-by-id.input";
import { DeleteMasterInput } from "./dto/delete-master.input";

@Injectable()
export class MastersService {
  constructor(private repository: MastersRepository) { }

  async createMaster(params: { name: Master['name'] }) {
    const { name } = params;
    return await this.repository.createMaster({
      data: {
        name
      }
    });
  }

  async getMasters() {
    return await this.repository.getMasters({});
  }

  async getMasterById(params: SelectMasterByIdInput) {
    return this.repository.getMasterById({
      where: params
    });
  }

  async updateMaster(params: UpdateMasterInput) {
    return this.repository.updateMaster(params);
  }

  async deleteMaster(params: DeleteMasterInput) {
    return this.repository.deleteMasterById({
      where: {
        id: params.id
      }
    });
  }
}