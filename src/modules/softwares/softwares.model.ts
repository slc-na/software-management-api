import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Software as SoftwareDB } from "@prisma/client";
import { SoftwareGroup } from "../software-groups/software-groups.model";
import { SoftwareMaster } from "../software-masters/software-masters.model";
import { SoftwareCourse } from "../software-courses/software-courses.model";
import { SoftwareOnRoom } from "../software-on-rooms/software-on-rooms.model";

@ObjectType()
export class Software {
  @Field(() => String) id: SoftwareDB['id'];
  @Field(() => String) name: SoftwareDB['name'];
  @Field(() => String) version: SoftwareDB['version'];
  @Field(() => String) license: SoftwareDB['license'];
  @Field(() => Number) numberOfLicense: SoftwareDB['numberOfLicense'];
  @Field(() => String) currentLicense: SoftwareDB['currentLicense'];
  @Field(() => String) installerPath: SoftwareDB['installerPath'];
  @Field(() => String, { nullable: true }) note?: SoftwareDB['note'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareDB['updatedAt'];
  @Field(() => [SoftwareGroup]) softwareGroups: SoftwareGroup[];
  @Field(() => [SoftwareMaster]) softwareMasters: SoftwareMaster[];
  @Field(() => [SoftwareCourse]) softwareCourses: SoftwareCourse[];
  @Field(() => [SoftwareOnRoom]) softwareOnRooms: SoftwareOnRoom[];
}