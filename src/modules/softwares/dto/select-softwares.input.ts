import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SelectSoftwaresInput {

  @Field({ nullable: true })
  semesterId?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  orderBy?: string;

  @Field({ nullable: true })
  orderProperty?: string;

  @Field({ nullable: true })
  groupId?: string;

  @Field({ nullable: true })
  orderDirection?: 'asc' | 'desc';

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}