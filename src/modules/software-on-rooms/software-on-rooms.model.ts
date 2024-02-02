import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareOnRoom as SoftwareOnRoomDB } from "@prisma/client";
import { Software } from "../softwares/softwares.model";
import { Semester } from "../semesters/semesters.model";
import { Room } from "../rooms/rooms.model";

@ObjectType()
export class SoftwareOnRoom {
  @Field(() => Software) software: Software;
  @Field(() => String) softwareId: SoftwareOnRoomDB['softwareId'];
  @Field(() => Room) room: Room;
  @Field(() => String) roomId: SoftwareOnRoomDB['roomId'];
  @Field(() => Semester) semester: Semester
  @Field(() => String) semesterId: SoftwareOnRoomDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareOnRoomDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareOnRoomDB['updatedAt'];
}
