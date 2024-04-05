import { Field, InputType } from "@nestjs/graphql";
import { Master } from "./master.input";

@InputType()
export class RecapMapping {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) courseId: string;
  @Field(() => String, { nullable: false }) groupId: string;
  @Field(() => String, { nullable: false }) departmentId: string;
  @Field(() => String, { nullable: false }) masters: Master[];
  @Field(() => String, { nullable: false }) internetTypeId: string;
}