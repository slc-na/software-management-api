import { Field, InputType, PartialType } from "@nestjs/graphql";
import { Software } from "src/modules/softwares/softwares.model";

@InputType()
export class CreateSoftwareBySemesterInput extends PartialType(Software){
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) courseId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
