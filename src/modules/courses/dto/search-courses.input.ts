import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchCoursesInput {
  @Field(() => String, {nullable: false}) query: string;
 
}