import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { DepartmentsService } from "src/modules/departments/departments.service";
import { RecapCount } from "src/modules/recaps/dto/recap-count.model";
import { RecapsJSONInput } from "src/modules/recaps/recaps.model";
import { RecapsServices } from "src/modules/recaps/recaps.service";

@Resolver()
export class RecapsResolver {
  constructor(private readonly recapServices: RecapsServices) {}

  @Mutation(returns => RecapCount) 
  async insertRecapData(@Args('recapDataJSONInput') recapDataJSONInput: RecapsJSONInput) {
    return { count: this.recapServices.insertRecapData(recapDataJSONInput) };
  }
}
