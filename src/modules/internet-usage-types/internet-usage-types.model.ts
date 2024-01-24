import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { InternetUsageType as InternetUsageTypeDB } from "@prisma/client";
import { Course } from "../courses/courses.model";

@ObjectType()
export class InternetUsageType {
  @Field(() => String) id: InternetUsageTypeDB['id'];
  @Field(() => String) name: InternetUsageTypeDB['name'];
  @Field(() => GraphQLISODateTime) createdAt: InternetUsageTypeDB['createdAt'];
  @Field(() => GraphQLISODateTime) updatedAt: InternetUsageTypeDB['updatedAt'];
  @Field(() => [Course]) courses: Course[];
}
