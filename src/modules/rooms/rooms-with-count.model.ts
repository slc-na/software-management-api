import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Room } from "./rooms.model";

@ObjectType()
export class RoomsWithCount {
  @Field(() => [Room]) rooms: Room[];
  @Field(() => Int) count: number;
}
