import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSoftwareOnRoomInput {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
