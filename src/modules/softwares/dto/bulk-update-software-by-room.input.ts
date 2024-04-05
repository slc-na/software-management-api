import { Field, InputType, Int } from "@nestjs/graphql";
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class BulkUpdateSoftwareByRoom {
    @Field(() => [graphqlTypeJson], { nullable: false })data: object[];
    @Field(() => String, { nullable: true }) roomId: string;
    @Field(() => String, { nullable: true }) semesterId: string;
}