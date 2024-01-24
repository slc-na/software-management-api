import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateInternetUsageTypeInput } from "./create-internet-usage-type.input";

@InputType()
export class UpdateInternetUsageTypeInput extends PartialType(CreateInternetUsageTypeInput) {
  @Field(() => String, { nullable: false }) id: string;
}