import { Field, InputType, PartialType } from "@nestjs/graphql";
import { Course } from "src/modules/courses/courses.model";
import { CreateCourseInput } from "src/modules/courses/dto/create-course.input";
import { Software } from "src/modules/softwares/softwares.model";

@InputType()
export class CreateCourseBySemesterInput extends PartialType(CreateCourseInput){
  @Field(() => String, { nullable: true }) softwareId: string;
  @Field(() => String, { nullable: true }) courseId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
