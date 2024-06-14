import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Room as RoomDB } from "@prisma/client";
import { SoftwareOnRoom } from "../software-on-rooms/software-on-rooms.model";

@ObjectType()
export class Room {
  @Field(() => String) id: RoomDB['id'];
  @Field(() => String) name: RoomDB['name'];
  @Field(() => String) description: RoomDB['name'];
  @Field(() => GraphQLISODateTime) createdAt: RoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: RoomDB['updatedAt'];
  @Field(() => [SoftwareOnRoom], {nullable:true}) softwareOnRooms: SoftwareOnRoom[];
}
