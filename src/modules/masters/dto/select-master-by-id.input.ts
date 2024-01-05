import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectMasterByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}