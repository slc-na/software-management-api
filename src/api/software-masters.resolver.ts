import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CoursesCount } from "src/modules/courses/courses-count.model";
import { CreateSoftwareMasterInput } from "src/modules/software-masters/dto/create-software-master.input";
import { SoftwareMaster } from "src/modules/software-masters/software-masters.model";
import { SoftwareMastersService } from "src/modules/software-masters/software-masters.service";

@Resolver()
export class SoftwareMastersResolver {
  constructor(private readonly softwareMastersService: SoftwareMastersService) {}

  @Query(() => CoursesCount)
  async getSoftwareMasters() {
    return this.softwareMastersService.getSoftwareMasters();
  }

  @Mutation(() => SoftwareMaster) // Update the return type if necessary
  async createSoftwareMaster(@Args('createSoftwareMasterInput') createSoftwareMasterInput: CreateSoftwareMasterInput) {
    return this.softwareMastersService.createSoftwareMaster(createSoftwareMasterInput);
  }

  // Uncomment and implement the deleteSoftwareMaster resolver if needed
  // @Mutation(() => SoftwareMaster)
  // async deleteSoftwareMaster(@Args('deleteSoftwareMasterInput') deleteSoftwareMasterInput: DeleteSoftwareMasterInput) {
  //   return this.softwareMastersService.deleteSoftwareMaster(deleteSoftwareMasterInput);
  // }
}
