import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteMasterInput {
  @Field(() => String, { nullable: false }) id: string;
}