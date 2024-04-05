import { Injectable } from "@nestjs/common";
import { Software } from "@prisma/client";
import { SoftwaresRepository } from "./softwares.repository";
import { SelectSoftwareByIdInput } from "./dto/select-software-by-id.input";
import { UpdateSoftwareInput } from "./dto/update-software.input";
import { DeleteSoftwareInput } from "./dto/delete-software.input";
import { SelectSoftwaresInput } from "./dto/select-softwares.input";
import { SearchSoftwaresInput } from "./dto/search-softwares.input";
import { pullDataToMessierInput } from "./dto/pull-data-to-messier.input";
import { CreateSoftwareInput } from "./dto/create-software.input";
import { BulkUpdateSoftwareByRoom } from "./dto/bulk-update-software-by-room.input";

@Injectable()
export class SoftwaresService {

  constructor(private repository: SoftwaresRepository) { }

  async createSoftware(params:CreateSoftwareInput) {
    const { name, version, license, currentLicense, installerPath, note, numberOfLicense, groupId, link } = params;
    
    if(!groupId){
      return await this.repository.createSoftware({
        data: {
          name: name,
          version: version,
          currentLicense: currentLicense,
          license: license,
          installerPath: installerPath,
          note: note,
          numberOfLicense: numberOfLicense,
          link: link
        }
      });
    }else{
      return await this.repository.createSoftwareWithGroup(params)
    }
    
  }

  async getSoftwaresCount() {
    return await this.repository.getSoftwaresCount();
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

  async searchSoftwares(params: SearchSoftwaresInput) {
    return this.repository.searchSoftwares(params);
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

  async pullDataToMessier(pullDataToMessierInput: pullDataToMessierInput) {
    //TODO: Unimplemented method
  }

}