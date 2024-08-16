import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CourseOutlineMessierModel {
    @Field(() => String, { nullable: false }) courseOutlineId: string;
    @Field(() => [DepartmentsMessierModel], { nullable: false }) departments : DepartmentsMessierModel[];
    @Field(() => String, { nullable: false }) name: string;
    @Field(() => SoftwareMessierModel, { nullable: false }) software;
}

@ObjectType()
export class DepartmentsMessierModel {
    @Field(() => String, { nullable: false }) DepartmentId: string;
    @Field(() => String, { nullable: false }) Name: string;
}

@ObjectType()
export class SoftwareMessierModel {
    @Field(() => String, { nullable: false }) name: string;
    @Field(() => String, { nullable: false }) semesterId: string;
    @Field(() => String, { nullable: false }) softwareId: string;
    @Field(() => String, { nullable: false }) version: string;
}
 