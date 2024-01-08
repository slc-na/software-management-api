import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareGroup as SoftwareGroupDB } from "@prisma/client";
import { Software } from "../softwares/softwares.model";
import { Group } from "../groups/groups.model";

@ObjectType()
export class SoftwareGroup {
  @Field(() => Software) software: Software;
  @Field(() => String) softwareId: SoftwareGroupDB['softwareId'];
  @Field(() => Group) group: Group;
  @Field(() => String) groupId: SoftwareGroupDB['groupId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareGroupDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareGroupDB['updatedAt'];
}
