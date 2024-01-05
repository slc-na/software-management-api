import { Injectable } from "@nestjs/common";
import { InternetUsageType } from "@prisma/client";
import { InternetUsageTypesRepository } from "./internet-usage-types.repository";
import { SelectInternetUsageTypeByIdInput } from "./dto/select-internet-usage-type-by-id.input";
import { UpdateInternetUsageTypeInput } from "./dto/update-internet-usage-type.input";
import { DeleteInternetUsageTypeInput } from "./dto/delete-internet-usage-type.input";

@Injectable()
export class InternetUsageTypesService {
  constructor(private repository: InternetUsageTypesRepository) {}

  async createInternetUsageType(params: { name: InternetUsageType['name'] }) {
    const { name } = params;
    return await this.repository.createInternetUsageType({
      data: {
        name
      }
    });
  }

  async getInternetUsageTypes() {
    return await this.repository.getInternetUsageTypes({});
  }

  async getInternetUsageTypeById(params: SelectInternetUsageTypeByIdInput) {
    return this.repository.getInternetUsageTypeById({
      where: params
    });
  }

  async updateInternetUsageType(params: UpdateInternetUsageTypeInput) {
    return this.repository.updateInternetUsageType(params);
  }

  async deleteInternetUsageType(params: DeleteInternetUsageTypeInput) {
    return this.repository.deleteInternetUsageTypeById({
      where: {
        id: params.id
      }
    });
  }
}