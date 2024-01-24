import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { Course as CourseDB } from "@prisma/client"
import { SoftwareCourse } from "../software-courses/software-courses.model";
import { Department } from "../departments/departments.model";
import { InternetUsageType } from "../internet-usage-types/internet-usage-types.model";

@ObjectType()
export class Course {
  @Field(() => String) id: CourseDB['id'];
  @Field(() => String) code: CourseDB['code']
  @Field(() => String) name: CourseDB['name'];
  @Field(() => Department) department: Department;
  @Field(() => String) departmentId: CourseDB['departmentId'];
  @Field(() => InternetUsageType) internetUsageType: InternetUsageType;
  @Field(() => String) internetUsageTypeId: CourseDB['internetUsageTypeId'];
  @Field(() => GraphQLISODateTime) createdAt: CourseDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: CourseDB['updatedAt'];
  @Field(() => [SoftwareCourse]) softwareCourses: SoftwareCourse[];
}