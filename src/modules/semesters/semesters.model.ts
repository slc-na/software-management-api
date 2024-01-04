import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Semester as SemesterDB } from "@prisma/client";
import { SoftwareCourse } from "../software-courses/software-courses.model";
import { SoftwareOnRoom } from "../software-on-rooms/software-on-rooms.model";
import { MasterOnRoom } from "../master-on-rooms/master-on-rooms.model";

@ObjectType()
export class Semester {
  @Field(() => String) id: SemesterDB['id'];
  @Field(() => String) name: SemesterDB['name'];
  @Field(() => Boolean) isActive: SemesterDB['isActive'];
  @Field(() => GraphQLISODateTime) createdAt: SemesterDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SemesterDB['updatedAt'];
  @Field(() => [SoftwareCourse]) softwareCourses: SoftwareCourse[];
  @Field(() => [SoftwareOnRoom]) softwareOnRooms: SoftwareOnRoom[];
  @Field(() => [MasterOnRoom]) masterOnRooms: MasterOnRoom[];
}
