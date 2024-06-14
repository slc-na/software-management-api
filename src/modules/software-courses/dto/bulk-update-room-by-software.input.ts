import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class BulkUpdateSoftwareByCourseInput {
    @Field(() => [String], { nullable: false }) data: string[];
    @Field(() => String, { nullable: true }) courseId: string;
    @Field(() => String, { nullable: true }) semesterId: string;
}