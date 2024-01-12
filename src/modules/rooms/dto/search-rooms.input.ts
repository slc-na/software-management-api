import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchRoomsInput {
  @Field(() => String, { nullable: false }) query: string;
}