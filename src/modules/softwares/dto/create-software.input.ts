import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSoftwareInput {
  @Field(() => String, { nullable: false }) name: string;
  @Field(() => String, { nullable: false }) version: string;
  @Field(() => String, { nullable: false }) license: string;
  @Field(() => Int, { nullable: false })    numberOfLicense: number;
  @Field(() => String, { nullable: false }) currentLicense: string;
  @Field(() => String, { nullable: false }) installerPath: string;
  @Field(() => String, { nullable: true })  note?: string;
  @Field(() => String, { nullable: true })  link?: string;
  @Field(() => String, { nullable: true }) groupId?: string;
}