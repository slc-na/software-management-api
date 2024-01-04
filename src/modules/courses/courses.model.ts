import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Course as CourseDB } from "@prisma/client"
import { SoftwareCourse } from "../software-courses/software-courses.model";

@ObjectType()
export class Course {
  @Field(() => String) id: CourseDB['id'];
  @Field(() => String) code: CourseDB['code']
  @Field(() => String) name: CourseDB['name'];
  @Field(() => String) departmentId: CourseDB['departmentId'];
  @Field(() => String) internetUsageTypeId: CourseDB['internetUsageTypeId'];
  @Field(() => GraphQLISODateTime) createdAt: CourseDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: CourseDB['updatedAt'];
  @Field(() => [SoftwareCourse]) softwareCourses: SoftwareCourse[];
}