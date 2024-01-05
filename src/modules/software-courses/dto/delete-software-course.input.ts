import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSoftwareCourseInput {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) courseId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
