import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSemesterInput {
  @Field(() => String, { nullable: false }) name: string;
  @Field(() => Boolean, { nullable: false }) isActive: boolean;
}