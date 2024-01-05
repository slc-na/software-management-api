import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareCourseInput } from "./create-software-course.input";

@InputType()
export class UpdateSoftwareCourseInput extends PartialType(CreateSoftwareCourseInput) {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) courseId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
