import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetRoomBySoftwareIdInput {
    @Field(() => String, { nullable: false }) softwareId: string;
    @Field(() => String, { nullable: false }) semesterId: string;
}
