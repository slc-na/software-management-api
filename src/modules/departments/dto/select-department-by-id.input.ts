import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectDepartmentByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}