import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { MasterOnRoom as MasterOnRoomDB } from "@prisma/client";

@ObjectType()
export class MasterOnRoom {
  @Field(() => String) masterId: MasterOnRoomDB['masterId'];
  @Field(() => String) roomId: MasterOnRoomDB['roomId'];
  @Field(() => String) semesterId: MasterOnRoomDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: MasterOnRoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: MasterOnRoomDB['updatedAt'];
}
