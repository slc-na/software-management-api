import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RoomModel {
    @Field(() => String, { nullable: false }) campus: string;
    @Field(() => Number, { nullable: false }) capacity: number;
    @Field(() => String, { nullable: false }) name: string;
    @Field(() => String, { nullable: false }) note: string;
    @Field(() => String, { nullable: false }) roomId: string;
}