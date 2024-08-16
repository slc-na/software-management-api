import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SaveSoftwareBulkInputMessier {
    @Field(() => String, { nullable: false }) SemesterId: string;
    @Field(() => [SoftwareMessierInput], { nullable: false }) SoftwareList: SoftwareMessierInput[];
}

@InputType()
export class SoftwareMessierInput {
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