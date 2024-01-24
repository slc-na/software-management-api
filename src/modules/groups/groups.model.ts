import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Group as GroupDB } from "@prisma/client";
import { SoftwareGroup } from "../software-groups/software-groups.model";

@ObjectType()
export class Group {
  @Field(() => String) id: GroupDB['id'];
  @Field(() => String) name: GroupDB['name'];
  @Field(() => GraphQLISODateTime) createdAt: GroupDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: GroupDB['updatedAt'];
  @Field(() => [SoftwareGroup]) softwareGroups: SoftwareGroup[];
}
