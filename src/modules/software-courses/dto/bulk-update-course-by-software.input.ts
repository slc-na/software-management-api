import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class BulkUpdateCourseBySoftwareInput {
    @Field(() => [String], { nullable: false }) data: string[];
    @Field(() => String, { nullable: true }) softwareId: string;
    @Field(() => String, { nullable: true }) semesterId: string;
} 