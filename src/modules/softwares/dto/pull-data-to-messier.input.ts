import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class pullDataToMessierInput {
  @Field(() => String, { nullable: false }) semesterPullTarget: string;
  @Field(() => String, { nullable: false }) semesterPullDestination: string;
}