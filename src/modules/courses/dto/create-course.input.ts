import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCourseInput {
  @Field(() => String, {nullable: false}) code: string;
  @Field(() => String, {nullable: false}) name: string;
  @Field(() => String, {nullable: false}) departmentId: string;
  @Field(() => String, {nullable: false}) internetUsageTypeId: string;
}