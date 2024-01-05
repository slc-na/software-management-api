import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSoftwareOnRoomInput {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
