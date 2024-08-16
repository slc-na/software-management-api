import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SoftwareMessier {
    @Field(() => String, { nullable: false }) name: string;
    @Field(() => String, { nullable: false }) semesterId: string;
    @Field(() => String, { nullable: false }) softwareId: string;
    @Field(() => String, { nullable: false }) version: string;
}