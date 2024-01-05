import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectGroupByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}