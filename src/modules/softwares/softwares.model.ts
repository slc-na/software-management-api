import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Software as SoftwareDB } from "@prisma/client";
import { SoftwareCourse } from "../software-courses/software-courses.model";
import { SoftwareOnRoom } from "../software-on-rooms/software-on-rooms.model";
import { Group } from "../groups/groups.model";

@ObjectType()
export class Software {
  @Field(() => String) id: SoftwareDB['id'];
  @Field(() => String) name: SoftwareDB['name'];
  @Field(() => String) version: SoftwareDB['version'];
  @Field(() => String) license: SoftwareDB['license'];
  @Field(() => Number) numberOfLicense: SoftwareDB['numberOfLicense'];
  @Field(() => String) currentLicense: SoftwareDB['currentLicense'];
  @Field(() => String) installerPath: SoftwareDB['installerPath'];
  @Field(() => String) link: SoftwareDB['link'];
  @Field(() => String, { nullable: true }) note?: SoftwareDB['note'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareDB['updatedAt'];
  @Field(() => Group) group: Group[];
  @Field(() => [SoftwareCourse]) softwareCourses: SoftwareCourse[];
  @Field(() => [SoftwareOnRoom]) softwareOnRooms: SoftwareOnRoom[];
}