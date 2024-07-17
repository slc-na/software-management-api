import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { number } from "zod";

@InputType()
export class SaveSoftwareMessierInput {
    @Field(() => String, { nullable: false }) SemesterId: string;
    @Field(() => String, { nullable: false }) Name: string;
    @Field(() => String, { nullable: false }) Version: string;
    @Field(() => String, { nullable: false }) License: string;
    @Field(() => String, { nullable: false }) CurrentLicense: string;
    @Field(() => String, { nullable: false }) NumberOfLicense: string;
    @Field(() => String, { nullable: false }) Group: string;
    @Field(() => String, { nullable: false }) Link: string;
    @Field(() => String, { nullable: false }) Note: string;
    @Field(() => String, { nullable: false }) InstallerPath: string;
}