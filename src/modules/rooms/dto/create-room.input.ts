import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRoomInput {
  @Field(() => String, { nullable: false }) name: string;
}