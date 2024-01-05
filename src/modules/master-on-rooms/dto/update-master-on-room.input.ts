import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateMasterOnRoomInput } from "./create-master-on-room.input";

@InputType()
export class UpdateMasterOnRoomInput extends PartialType(CreateMasterOnRoomInput) {
  @Field(() => String, { nullable: false }) masterId: string;
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}