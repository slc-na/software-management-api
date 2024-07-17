import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { number } from "zod";

@InputType()
export class DeleteSoftwareMessierInput {
    @Field(() => String, { nullable: false }) SoftwareID: string;
    @Field(() => String, { nullable: false }) Reason: string;
}