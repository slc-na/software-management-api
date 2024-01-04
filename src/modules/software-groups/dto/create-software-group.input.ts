import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSoftwareGroupInput {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) groupId: string;
}
