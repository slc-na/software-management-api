import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DepartmentsCount {
  @Field(() => Int) count: number;
}
