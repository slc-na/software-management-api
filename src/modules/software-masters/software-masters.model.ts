import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { SoftwareMaster as SoftwareMasterDB } from "@prisma/client";
import { Software } from "../softwares/softwares.model";
import { Master } from "../masters/masters.model";

@ObjectType()
export class SoftwareMaster {
  @Field(() => Software) software: Software;
  @Field(() => String) softwareId: SoftwareMasterDB['softwareId'];
  @Field(() => Master) master: Master;
  @Field(() => String) masterId: SoftwareMasterDB['masterId'];
  @Field(() => GraphQLISODateTime) createdAt: SoftwareMasterDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: SoftwareMasterDB['updatedAt'];
}
