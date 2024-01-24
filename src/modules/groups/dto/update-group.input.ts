import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCourseInput } from "src/modules/courses/dto/create-course.input";

@InputType()
export class UpdateGroupInput extends PartialType(CreateCourseInput) {
  @Field(() => String, { nullable: false }) id: string;
}