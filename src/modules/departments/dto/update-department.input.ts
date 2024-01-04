import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateDepartmentInput } from "./create-department.input";

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => String, { nullable: false }) id: string;
}