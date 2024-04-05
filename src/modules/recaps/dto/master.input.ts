import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Master {
  @Field(() => String, { nullable: false }) id: string;
  @Field(() => String, { nullable: false }) name: string;
  @Field(() => String, { nullable: false }) createdAt: string;
  @Field(() => String, { nullable: false }) updatedAt: string;
}