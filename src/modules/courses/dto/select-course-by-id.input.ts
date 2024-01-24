import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SelectCourseByIdInput {
  @Field(() => String, {nullable: false}) id: string;
  @Field(() => Int, {nullable: true}) skip?: number;
  @Field(() => Int, {nullable: true}) take?: number;
}