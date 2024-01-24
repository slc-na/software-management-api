import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareCourse as SoftwareCourseDB } from "@prisma/client";
import { Software } from "../softwares/softwares.model";
import { Course } from "../courses/courses.model";
import { Semester } from "../semesters/semesters.model";

@ObjectType()
export class SoftwareCourse {
  @Field(() => Software) software: Software;
  @Field(() => String) softwareId: SoftwareCourseDB['softwareId'];
  @Field(() => Course) course: Course;
  @Field(() => String) courseId: SoftwareCourseDB['courseId'];
  @Field(() => Semester) semester: Semester;
  @Field(() => String) semesterId: SoftwareCourseDB['semesterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareCourseDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareCourseDB['updatedAt'];
}
