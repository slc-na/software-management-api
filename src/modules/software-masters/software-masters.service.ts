import { Injectable } from "@nestjs/common";
import { SoftwareMaster } from "@prisma/client";
import { SoftwareMastersRepository } from "./software-masters.repository";
import { SelectSoftwareMasterByIdInput } from "./dto/select-software-master-by-id.input";
import { UpdateSoftwareMasterInput } from "./dto/update-software-master.input";
import { DeleteSoftwareMasterInput } from "./dto/delete-software-master.input";
@Injectable()
export class SoftwareMastersService {
  constructor(private repository: SoftwareMastersRepository ) {}

  async createSoftwareMaster(params: { softwareId: SoftwareMaster['softwareId'], masterId: SoftwareMaster['masterId']}) {
    const { softwareId, masterId } = params;
    return await this.repository.createSoftwareMaster({
      data: {
        software: {
          connect: {
            id: softwareId
          }
        },
        master: {
          connect: {
            id: masterId
          }
        },
      }
    });
  }

  async getSoftwareMasters() {
    return await this.repository.getSoftwareMasters({});
  }

  async getSoftwareMasterById(params: SelectSoftwareMasterByIdInput) {
    return this.repository.getSoftwareMasterById({
      where: {
        softwareId_masterId: {
          masterId: params.masterId,
          softwareId: params.softwareId,
        }
      },
    });
  }

  async updateSoftwareMaster(params: UpdateSoftwareMasterInput) {
    return this.repository.updateSoftwareMaster(params);
  }

  async deleteSoftwareMaster(params: DeleteSoftwareMasterInput) {
    return this.repository.deleteSoftwareMasterById({
      where: {
        softwareId_masterId: {
          masterId: params.masterId,
          softwareId: params.softwareId,
        }
      },
    });
  }
}