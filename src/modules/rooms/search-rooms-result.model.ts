import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Room } from "./rooms.model";
@ObjectType()
export class SearchRoomsResult {
  @Field(() => [Room]) rooms: Room[];
  @Field(() => Int) count: number;
}
