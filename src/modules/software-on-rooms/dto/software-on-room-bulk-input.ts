import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SoftwareOnRoomBulkInput {
  @Field(() => [String], { nullable: false }) softwareIds: string[];
  @Field(() => [String], { nullable: false }) roomIds: string[];
  @Field(() => String, { nullable: false }) semesterId: string;
}
