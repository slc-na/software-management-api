import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SoftwaresCount {
  @Field(() => Int) count: number;
}