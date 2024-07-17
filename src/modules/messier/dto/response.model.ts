import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseModel {
    @Field(() => String, { nullable: false }) response: string;
    @Field(() => Number, { nullable: false }) code: number;
}