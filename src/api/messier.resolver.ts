import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { DeleteSoftwareMessierInput } from "src/modules/messier/dto/delete-software.input";
import { MessierInput } from "src/modules/messier/dto/messier.input";
import { MessierModel } from "src/modules/messier/dto/messier.model";
import { ResponseModel } from "src/modules/messier/dto/response.model";
import { SaveSoftwareMessierInput } from "src/modules/messier/dto/save-software.input";
import { MessierServices } from "src/modules/messier/messier.service";

@Resolver()
export class MessierResolver {
  constructor(private readonly messierService: MessierServices) { }

  @Mutation(() => MessierModel)
  async test(@Args('MessierInput') messierInput: MessierInput) {
    return this.messierService.test(messierInput)
  }

  @Mutation(() => ResponseModel)
  async saveSoftwareToMessier(@Args('MessierInput') saveSoftwareInput: SaveSoftwareMessierInput) {
    return this.messierService.saveSoftware(saveSoftwareInput)

  }
  @Mutation(() => ResponseModel)
  async deleteSoftwareFromMessier(@Args('MessierInput') deleteSoftwareInput: DeleteSoftwareMessierInput) {
    return this.messierService.deleteSoftware(deleteSoftwareInput)

  }

}