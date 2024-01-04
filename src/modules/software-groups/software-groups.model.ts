import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareGroup as SoftwareGroupDB } from "@prisma/client";

@ObjectType()
export class SoftwareGroup {
  @Field(() => String) softwareId: SoftwareGroupDB['softwareId'];
  @Field(() => String) groupId: SoftwareGroupDB['groupId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareGroupDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareGroupDB['updatedAt'];
}
