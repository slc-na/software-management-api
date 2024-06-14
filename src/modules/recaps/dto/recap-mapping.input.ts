import { Field, InputType } from "@nestjs/graphql";
import { Room } from "@prisma/client";

@InputType()
export class RecapMapping {
  @Field(() => String, { nullable: false }) softwareId: string;
  @Field(() => String, { nullable: false }) courseId: string;
  @Field(() => String, { nullable: false }) groupId: string;
  @Field(() => String, { nullable: false }) departmentId: string;
  @Field(() => String, { nullable: false }) rooms: Room[];
  @Field(() => String, { nullable: false }) internetTypeId: string;
}