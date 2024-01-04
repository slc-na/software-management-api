import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CoursesResolver } from './api/courses.resolver';
import { DepartmentsModule } from './modules/departments/departments.module';
import { DepartmentsResolver } from './api/departments.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    PrismaModule,
    CoursesModule,
    DepartmentsModule
  ],
  controllers: [],
  providers: [
    CoursesResolver,
    DepartmentsResolver
  ],
})
export class AppModule {}
