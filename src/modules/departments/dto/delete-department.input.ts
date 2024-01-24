import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteDepartmentInput {
  @Field(() => String, { nullable: false }) id: string;
}