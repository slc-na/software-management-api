import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GenerateMasterMessierInput {
    @Field(() => String, { nullable: false }) Key: string;
    @Field(() => String, { nullable: false }) Value: string;
    @Field(() => String, { nullable: false }) Description: string;
    
}