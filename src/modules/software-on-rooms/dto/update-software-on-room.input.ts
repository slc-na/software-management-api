import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSoftwareOnRoomInput } from "./create-software-on-room.input";

@InputType()
export class UpdateSoftwareOnRoomInput extends PartialType(CreateSoftwareOnRoomInput) {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
