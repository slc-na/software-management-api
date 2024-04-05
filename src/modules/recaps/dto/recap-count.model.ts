import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RecapCount {
  @Field(() => Int) count: number;
}
