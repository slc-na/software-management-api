import { Field, InputType, PartialType } from "@nestjs/graphql";
import { SelectSoftwareCourseInput } from "./select-software-course.input";

@InputType()
export class SelectSoftwareCourseBySemesterInput extends PartialType(SelectSoftwareCourseInput) {
  @Field(() => String, { nullable: false }) orderProperty: string;
  @Field(() => String, { nullable: false }) currentSemesterId: string;
}