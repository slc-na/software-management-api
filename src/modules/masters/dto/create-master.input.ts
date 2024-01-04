import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMasterInput {
  @Field(() => String, { nullable: false }) name: string;
}