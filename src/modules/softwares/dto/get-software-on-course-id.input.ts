import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetSoftwareByCourseIdInput {
    @Field(() => String, { nullable: false }) courseId: string;
    @Field(() => String, { nullable: false }) semesterId: string;
}
``