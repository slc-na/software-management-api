import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetSoftwareByRoomInput {
  @Field(() => String, { nullable: false }) roomId: string;
  @Field(() => String, { nullable: false }) semesterId: string;
}
