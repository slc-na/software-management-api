import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteInternetUsageTypeInput {
  @Field(() => String, { nullable: false }) id: string;
}