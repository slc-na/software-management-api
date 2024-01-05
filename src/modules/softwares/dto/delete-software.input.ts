import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSoftwareInput {
  @Field(() => String, { nullable: false }) id: string;
}