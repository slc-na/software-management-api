import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectSoftwareByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}