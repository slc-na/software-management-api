import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MapSoftwareToMasterMessierInput {
    @Field(() => String, { nullable: false }) SemesterId: string;
    @Field(() => String, { nullable: false }) SoftwareIDs: string;
    @Field(() => [String, { nullable: false }], { nullable: false }) MasterIds: string[];
}
