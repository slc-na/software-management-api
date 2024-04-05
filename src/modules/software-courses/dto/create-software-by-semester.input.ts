import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareInput } from "src/modules/softwares/dto/create-software.input";

@InputType()
export class CreateSoftwareBySemesterInput extends PartialType(CreateSoftwareInput){
  @Field(() => String, { nullable: true }) softwareId: string;
  @Field(() => String, { nullable: true }) courseId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
