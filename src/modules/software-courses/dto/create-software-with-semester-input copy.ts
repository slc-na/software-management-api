import { Field, InputType, PartialType } from "@nestjs/graphql";
import { Course } from "src/modules/courses/courses.model";
import { Software } from "src/modules/softwares/softwares.model";

@InputType()
export class CreateSoftwareWithSemesterInput extends PartialType(Software){
  @Field(() => String, { nullable: false }) semesterId: string;
}
