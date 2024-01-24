import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteCourseInput {
  @Field(() => String, {nullable: false}) id: string;
 
}