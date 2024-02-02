import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCourseInput } from "./create-course.input";

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field(() => String, {nullable: false}) newCode: string;
  @Field(() => String, {nullable: false}) newDepartmentId: string;
  @Field(() => String, {nullable: false}) newInternetUsageTypeId: string;
  @Field(() => String, {nullable: false}) newName: string;
}