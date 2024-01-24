import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteGroupInput {
  @Field(() => String, { nullable: false }) id: string;
}