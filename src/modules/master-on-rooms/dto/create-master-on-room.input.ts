import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMasterOnRoomInput {
  @Field(() => String, { nullable: false }) masterId: string;
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}