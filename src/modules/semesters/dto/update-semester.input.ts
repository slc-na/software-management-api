import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSemesterInput } from "./create-semester.input";

@InputType()
export class UpdateSemesterInput extends PartialType(CreateSemesterInput){
  @Field(() => String, { nullable: false }) id: string;
}