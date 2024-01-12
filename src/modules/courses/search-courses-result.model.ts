import { Field,  Int, ObjectType } from "@nestjs/graphql";
import { Course } from "./courses.model";


@ObjectType()
export class SearchCoursesResult {
  @Field(() => [Course]) courses: Course[];
  @Field(() => Int) count: number;
}