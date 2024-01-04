import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDepartmentInput {
  @Field(() => String, { nullable: false }) name: string;
}