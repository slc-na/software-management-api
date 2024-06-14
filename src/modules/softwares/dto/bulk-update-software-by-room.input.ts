import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class BulkUpdateSoftwareByRoomInput {
    @Field(() => [String], { nullable: false }) data: string[];
    @Field(() => String, { nullable: true }) roomId: string;
    @Field(() => String, { nullable: true }) semesterId: string;
}