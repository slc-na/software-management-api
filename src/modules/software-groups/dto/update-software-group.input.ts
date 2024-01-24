import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareGroupInput } from "./create-software-group.input";

@InputType()
export class UpdateSoftwareGroupInput extends PartialType(CreateSoftwareGroupInput) {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) groupId: string;
}
