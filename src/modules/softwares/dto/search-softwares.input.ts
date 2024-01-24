import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchSoftwaresInput {
  @Field(() => String, { nullable: false }) query: string;
}