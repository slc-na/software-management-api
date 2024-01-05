import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectSemesterByIdInput {
  @Field(() => String, { nullable: false }) id: string;
}