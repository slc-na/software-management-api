import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Room, SoftwareOnRoom as SoftwareOnRoomDB } from "@prisma/client";
import { Software } from "../softwares/softwares.model";
import { Semester } from "../semesters/semesters.model";

@ObjectType()
export class SoftwareOnRoom {
  @Field(() => Software) software: Software;
  @Field(() => String) softwareId: SoftwareOnRoomDB['softwareId'];
  @Field(() => String) room: Room;
  @Field(() => String) roomId: SoftwareOnRoomDB['roomId'];
  @Field(() => Semester) semester: Semester
  @Field(() => String) semesterId: SoftwareOnRoomDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareOnRoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareOnRoomDB['updatedAt'];
}
