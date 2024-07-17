import { Scalar, CustomScalar, Field, InputType } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class RecapsJSONInput {
  @Field(() => [graphqlTypeJson], { nullable: false })data: object[];
  @Field(() => String, { nullable: true })semesterId: string;
}