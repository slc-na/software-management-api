import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Department as DepartmentDB } from "@prisma/client";
import { Course } from "../courses/courses.model";

@ObjectType()
export class Department {
  @Field(() => String) id: DepartmentDB['id'];
  @Field(() => String) name: DepartmentDB['name'];
  @Field(() => GraphQLISODateTime) createdAt: DepartmentDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: DepartmentDB['updatedAt'];
  @Field(() => [Course]) courses: Course[];
}
