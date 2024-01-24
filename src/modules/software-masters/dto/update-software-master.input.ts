import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareMasterInput } from "./create-software-master.input";

@InputType()
export class UpdateSoftwareMasterInput extends PartialType(CreateSoftwareMasterInput) {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) masterId: string;
}
