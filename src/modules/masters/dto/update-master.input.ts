import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateMasterInput } from "./create-master.input";

@InputType()
export class UpdateMasterInput extends PartialType(CreateMasterInput) {
  @Field(() => String, { nullable: false }) id: string;
}