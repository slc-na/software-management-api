import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectInternetUsageTypeByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}