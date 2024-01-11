import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RoomsCount {
  @Field(() => Int) count: number;
}
