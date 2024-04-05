import { Field, InputType } from "@nestjs/graphql";
import { Master } from "./master.input";

@InputType()
export class MasterMapping {
  @Field(() => String, { nullable: false }) general_black: string;
  @Field(() => String, { nullable: false }) general_silver: string;
  @Field(() => String, { nullable: false }) bahasa: string;
  @Field(() => String, { nullable: false }) jaringan: string;
  @Field(() => String, { nullable: false }) mulmed: string;
  @Field(() => String, { nullable: false }) highspec: string;
  @Field(() => String, { nullable: false }) mac: string;
}