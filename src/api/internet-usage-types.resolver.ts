import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateInternetUsageTypeInput } from "src/modules/internet-usage-types/dto/create-internet-usage-type.input";
import { DeleteInternetUsageTypeInput } from "src/modules/internet-usage-types/dto/delete-internet-usage-type.input";
import { SelectInternetUsageTypeByIdInput } from "src/modules/internet-usage-types/dto/select-internet-usage-type-by-id.input";
import { UpdateInternetUsageTypeInput } from "src/modules/internet-usage-types/dto/update-internet-usage-type.input";
import { InternetUsageType } from "src/modules/internet-usage-types/internet-usage-types.model";
import { InternetUsageTypesService } from "src/modules/internet-usage-types/internet-usage-types.service";

@Resolver()
export class InternetUsageTypesResolver {
  constructor(private readonly internetUsageTypesService: InternetUsageTypesService) {}

  @Query(() => [InternetUsageType])
  async getInternetUsageTypes() {
    return this.internetUsageTypesService.getInternetUsageTypes();
  }

  @Query(() => InternetUsageType)
  async getInternetUsageTypeById(@Args('selectInternetUsageTypeByIdInput') selectInternetUsageTypeByIdInput: SelectInternetUsageTypeByIdInput) {
    return this.internetUsageTypesService.getInternetUsageTypeById(selectInternetUsageTypeByIdInput);
  }

  @Mutation(() => InternetUsageType)
  async createInternetUsageType(@Args('createInternetUsageTypeInput') createInternetUsageTypeInput: CreateInternetUsageTypeInput) {
    return this.internetUsageTypesService.createInternetUsageType(createInternetUsageTypeInput);
  }

  @Mutation(() => InternetUsageType)
  async updateInternetUsageType(@Args('updateInternetUsageTypeInput') updateInternetUsageTypeInput: UpdateInternetUsageTypeInput) {
    return this.internetUsageTypesService.updateInternetUsageType(updateInternetUsageTypeInput);
  }

  @Mutation(() => InternetUsageType)
  async deleteInternetUsageType(@Args('deleteInternetUsageTypeInput') deleteInternetUsageTypeInput: DeleteInternetUsageTypeInput) {
    return this.internetUsageTypesService.deleteInternetUsageType(deleteInternetUsageTypeInput);
  }
}