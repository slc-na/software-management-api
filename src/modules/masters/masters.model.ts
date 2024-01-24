import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Master as MasterDB } from "@prisma/client";
import { SoftwareMaster } from "../software-masters/software-masters.model";
import { MasterOnRoom } from "../master-on-rooms/master-on-rooms.model";

@ObjectType()
export class Master {
  @Field(() => String) id: MasterDB['id'];
  @Field(() => String) name: MasterDB['name'];
  @Field(() => GraphQLISODateTime) createdAt: MasterDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: MasterDB['updatedAt'];
  @Field(() => [SoftwareMaster]) softwareMasters: SoftwareMaster[];
  @Field(() => [MasterOnRoom]) masterOnRooms: MasterOnRoom[];
}
