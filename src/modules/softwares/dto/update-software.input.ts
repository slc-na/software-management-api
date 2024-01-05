import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareInput } from "./create-software.input";

@InputType()
export class UpdateSoftwareInput extends PartialType(CreateSoftwareInput) {
  @Field(() => String, { nullable: false }) id: string;
}