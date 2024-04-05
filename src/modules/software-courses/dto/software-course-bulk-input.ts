import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SoftwareCourseBulkInput {
  @Field(() => [String], { nullable: false }) softwareIds: string[];
  @Field(() => [String], { nullable: false }) courseIds: string[];
  @Field(() => String, { nullable: false }) semesterId: string;
}
