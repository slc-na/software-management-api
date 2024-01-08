import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { MasterOnRoom as MasterOnRoomDB } from "@prisma/client";
import { Master } from "../Masters/Masters.model";
import { Room } from "../rooms/rooms.model";
import { Semester } from "../semesters/semesters.model";

@ObjectType()
export class MasterOnRoom {
  @Field(() => Master) master: Master;
  @Field(() => String) masterId: MasterOnRoomDB['masterId'];
  @Field(() => Room) room: Room;
  @Field(() => String) roomId: MasterOnRoomDB['roomId'];
  @Field(() => Semester) semester: Semester;
  @Field(() => String) semesterId: MasterOnRoomDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: MasterOnRoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: MasterOnRoomDB['updatedAt'];
}
