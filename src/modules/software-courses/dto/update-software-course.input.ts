import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareCourseInput } from "./create-software-course.input";

@InputType()
export class UpdateSoftwareCourseInput extends PartialType(CreateSoftwareCourseInput) {
  @Field(() => String, { nullable: false }) newSoftwareId: string;
  @Field(() => String, { nullable: false }) newCourseId: string;
  @Field(() => String, { nullable: false }) newSemesterId: string;
  @Field(() => String, { nullable: false }) oldSoftwareId: string;
  @Field(() => String, { nullable: false }) oldCourseId: string;
  @Field(() => String, { nullable: false }) oldSemesterId: string;
}
