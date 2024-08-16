import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SaveMultipleMapSoftwareMessierInput {
    @Field(() => String, { nullable: false }) SemesterId: string;
    @Field(() => [String, { nullable: false }], { nullable: false }) SoftwareIDs: string[];
    @Field(() => String, { nullable: false }) Room: string;
}
