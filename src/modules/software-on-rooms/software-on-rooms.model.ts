import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareOnRoom as SoftwareOnRoomDB } from "@prisma/client";

@ObjectType()
export class SoftwareOnRoom {
  @Field(() => String) softwareId: SoftwareOnRoomDB['softwareId'];
  @Field(() => String) roomId: SoftwareOnRoomDB['roomId'];
  @Field(() => String) semesterId: SoftwareOnRoomDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareOnRoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareOnRoomDB['updatedAt'];
}
