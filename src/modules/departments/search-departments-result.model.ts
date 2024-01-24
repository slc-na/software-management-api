import { Field,  Int,  ObjectType } from "@nestjs/graphql";
import { Department } from "./departments.model";
@ObjectType()
export class SearchDepartmentsResult {
  @Field(() => [Department]) departments: Department[];
  @Field(() => Int) count: number;
}
