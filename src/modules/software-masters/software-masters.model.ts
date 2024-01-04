import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareMaster as SoftwareMasterDB } from "@prisma/client";

@ObjectType()
export class SoftwareMaster {
  @Field(() => String) softwareId: SoftwareMasterDB['softwareId'];
  @Field(() => String) masterId: SoftwareMasterDB['masterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareMasterDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareMasterDB['updatedAt'];
}
