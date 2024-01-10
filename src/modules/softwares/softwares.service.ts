import { Injectable } from "@nestjs/common";
import { Software } from "@prisma/client";
import { SoftwaresRepository } from "./softwares.repository";
import { SelectSoftwareByIdInput } from "./dto/select-software-by-id.input";
import { UpdateSoftwareInput } from "./dto/update-software.input";
import { DeleteSoftwareInput } from "./dto/delete-software.input";
import { SelectSoftwaresInput } from "./dto/select-softwares.input";

@Injectable()
export class SoftwaresService {
  constructor(private repository: SoftwaresRepository) { }

  async createSoftware(params: { name: Software['name'], version: Software['version'], license: Software['license'], numberOfLicense: Software['numberOfLicense'], currentLicense: Software['currentLicense'], installerPath: Software['installerPath'], note?: Software['note'] }) {
    const { name, version, license, currentLicense, installerPath, note, numberOfLicense } = params;
    return await this.repository.createSoftware({
      data: {
        name: name,
        version: version,
        currentLicense: currentLicense,
        license: license,
        installerPath: installerPath,
        note: note,
        numberOfLicense: numberOfLicense,
      }
    });
  }

  async getSoftwares(params: SelectSoftwaresInput) {
    return await this.repository.getSoftwares(params);
  }

  async getSoftwareById(params: SelectSoftwareByIdInput) {
    return this.repository.getSoftwareById({
      where: {
        id: params.id
      },
    });
  }

  async updateSoftware(params: UpdateSoftwareInput) {
    return this.repository.updateSoftware(params);
  }

  async deleteSoftware(params: DeleteSoftwareInput) {
    return this.repository.deleteSoftwareById({
      where: {
        id: params.id
      },
    });
  }
}