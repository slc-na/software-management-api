import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSemesterInput {
  @Field(() => String, { nullable: false }) id: string;
}