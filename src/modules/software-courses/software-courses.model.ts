import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareCourse as SoftwareCourseDB } from "@prisma/client";

@ObjectType()
export class SoftwareCourse {
  @Field(() => String) softwareId: SoftwareCourseDB['softwareId'];
  @Field(() => String) courseId: SoftwareCourseDB['courseId'];
  @Field(() => String) semesterId: SoftwareCourseDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareCourseDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareCourseDB['updatedAt'];
}
