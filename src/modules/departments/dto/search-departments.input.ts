import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchDepartmentsInput {
  @Field(() => String, { nullable: false }) query: string;
}