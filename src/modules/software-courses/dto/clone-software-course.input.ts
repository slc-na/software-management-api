import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class CloneSoftwareCourseInput {
  @Field(() => String, { nullable: false }) currentSemester: string;
  @Field(() => String, { nullable: false }) targetSemester: string;
}
