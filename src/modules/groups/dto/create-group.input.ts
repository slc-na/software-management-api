import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateGroupInput {
  @Field(() => String, { nullable: false }) name: string;
}