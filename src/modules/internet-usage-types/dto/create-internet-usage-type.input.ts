import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateInternetUsageTypeInput {
  @Field(() => String, { nullable: false }) name: string;
}