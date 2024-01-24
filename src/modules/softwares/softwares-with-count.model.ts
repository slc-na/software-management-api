import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Software } from "./softwares.model";


@ObjectType()
export class SoftwaresWithCount {
  @Field(() => [Software]) softwares: Software[];
  @Field(() => Int) count: number;
}