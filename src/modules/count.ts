import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CountRes {
    @Field(() => Number) count: number;
}