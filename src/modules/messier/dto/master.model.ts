import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MasterModel {
    // Description : data["Description"],
    //       InsertDate : data["InsertDate"],
    //       MasterId : data["Master"]["MasterId"],
    //       Name : data["Master"]["Name"],
    //       SemesterId : data["Master"]["SemesterId"],
    //       PIC : data["PIC"],
    @Field(() => String, { nullable: true }) description: string;
    @Field(() => String, { nullable: true }) insertDate: string;
    @Field(() => String, { nullable: true }) masterId: string;
    @Field(() => String, { nullable: true }) name: string;
    @Field(() => String, { nullable: true }) semesterId: string;
    @Field(() => String, { nullable: true }) PIC: string;
} 