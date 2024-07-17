import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MessierInput {
  @Field(() => String, { nullable: false }) text: string;

}