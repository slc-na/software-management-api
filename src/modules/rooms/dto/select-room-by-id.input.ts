import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectRoomByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}