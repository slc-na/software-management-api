import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MessierModel {
    @Field(() => String, { nullable: false }) text: string;
}