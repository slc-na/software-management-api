import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateSoftwareInput } from "src/modules/softwares/dto/create-software.input";
import { DeleteSoftwareInput } from "src/modules/softwares/dto/delete-software.input";
import { SelectSoftwareByIdInput } from "src/modules/softwares/dto/select-software-by-id.input";
import { UpdateSoftwareInput } from "src/modules/softwares/dto/update-software.input";
import { Software } from "src/modules/softwares/softwares.model";
import { SoftwaresService } from "src/modules/softwares/softwares.service";

@Resolver()
export class SoftwaresResolver {
  constructor(private readonly softwaresService: SoftwaresService) {}

  @Query(() => [Software])
  async getSoftwares() {
    return this.softwaresService.getSoftwares();
  }

  @Query(() => Software)
  async getSoftwareById(@Args('selectSoftwareByIdInput') selectSoftwareByIdInput: SelectSoftwareByIdInput) {
    return this.softwaresService.getSoftwareById(selectSoftwareByIdInput);
  }

  @Mutation(() => Software)
  async createSoftware(@Args('createSoftwareInput') createSoftwareInput: CreateSoftwareInput) {
    return this.softwaresService.createSoftware(createSoftwareInput);
  }

  @Mutation(() => Software)
  async updateSoftware(@Args('updateSoftwareInput') updateSoftwareInput: UpdateSoftwareInput) {
    return this.softwaresService.updateSoftware(updateSoftwareInput);
  }

  @Mutation(() => Software)
  async deleteSoftware(@Args('deleteSoftwareInput') deleteSoftwareInput: DeleteSoftwareInput) {
    return this.softwaresService.deleteSoftware(deleteSoftwareInput);
  }
}