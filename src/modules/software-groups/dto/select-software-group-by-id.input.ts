import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SelectSoftwareGroupByIdInput {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) groupId: string;
}
