import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Course } from "./courses.model";


@ObjectType()
export class CoursesWithCount {
  @Field(() => [Course]) courses: Course[];
  @Field(() => Int) count: number;
}