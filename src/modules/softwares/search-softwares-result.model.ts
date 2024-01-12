import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Software } from "./softwares.model";


@ObjectType()
export class SearchSoftwaresResult {
  @Field(() => [Software]) softwares: Software[];
  @Field(() => Int) count: number;
}