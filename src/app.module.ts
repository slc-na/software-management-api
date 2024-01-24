import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CoursesResolver } from './api/courses.resolver';
import { DepartmentsModule } from './modules/departments/departments.module';
import { DepartmentsResolver } from './api/departments.resolver';
import { GroupsModule } from './modules/groups/groups.module';
import { GroupsResolver } from './api/groups.resolver';
import { InternetUsageTypesModule } from './modules/internet-usage-types/internet-usage-types.module';
import { MasterOnRoomsModule } from './modules/master-on-rooms/master-on-rooms.module';
import { InternetUsageTypesResolver } from './api/internet-usage-types.resolver';
import { MasterOnRoomsResolver } from './api/master-on-rooms.resolver';
import { MastersModule } from './modules/masters/masters.module';
import { MastersResolver } from './api/masters.resolver';
import { SemestersModule } from './modules/semesters/semesters.module';
import { SemestersResolver } from './api/semesters.resolver';
import { SoftwareCoursesModule } from './modules/software-courses/software-courses.module';
import { SoftwareCoursesResolver } from './api/software-courses.resolver';
import { SoftwareGroupsModule } from './modules/software-groups/software-groups.module';
import { SoftwareGroupsResolver } from './api/software-groups.resolver';
import { SoftwareOnRoomsModule } from './modules/software-on-rooms/software-on-rooms.module';
import { SoftwareOnRoomsResolver } from './api/software-on-rooms.resolver';
import { SoftwaresModule } from './modules/softwares/softwares.module';
import { SoftwaresResolver } from './api/softwares.resolver';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoomsResolver } from './api/rooms.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    PrismaModule,
    CoursesModule,
    DepartmentsModule,
    GroupsModule,
    InternetUsageTypesModule,
    MasterOnRoomsModule,
    MastersModule,
    SemestersModule,
    SoftwareCoursesModule,
    SoftwareGroupsModule,
    SoftwareOnRoomsModule,
    SoftwaresModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [
    CoursesResolver,
    DepartmentsResolver,
    GroupsResolver,
    InternetUsageTypesResolver,
    MasterOnRoomsResolver,
    MastersResolver,
    SemestersResolver,
    SoftwareCoursesResolver,
    SoftwareGroupsResolver,
    SoftwareOnRoomsResolver,
    SoftwaresResolver,
    RoomsResolver,
  ],
})
export class AppModule {}
