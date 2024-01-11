import { Field,  Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CoursesCount {
  @Field(() => Int) count: number;
}