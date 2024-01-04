import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectCourseByIdInput {
  @Field(() => String, {nullable: false}) id: string;
}