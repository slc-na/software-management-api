import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { Course } from "src/modules/courses/courses.model";
import { CoursesService } from "src/modules/courses/courses.service";
import { CreateCourseInput } from "src/modules/courses/dto/create-course.input";
import { DeleteCourseInput } from "src/modules/courses/dto/delete-course.input";
import { SelectCourseByIdInput } from "src/modules/courses/dto/select-course-by-id.input";
import { SelectCoursesInput } from "src/modules/courses/dto/select-courses.input";
import { UpdateCourseInput } from "src/modules/courses/dto/update-course.input";

@Resolver()
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => [Course])
  async getCourses(@Args('selectCoursesInput') selectCoursesInput: SelectCoursesInput) {
    return this.coursesService.getCourses(selectCoursesInput);
  }

  @Query(() => Course)
  async getCourseById(@Args('selectCourseByIdInput') selectCourseByIdInput: SelectCourseByIdInput) {
    return this.coursesService.getCourseById(selectCourseByIdInput);
  }

  @Mutation(() => Course)
  async createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.coursesService.createCourse(createCourseInput);
  }

  @Mutation(() => Course)
  async updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
    return this.coursesService.updateCourse(updateCourseInput);
  }

  @Mutation(() => Course)
  async deleteCourse(@Args('deleteCourseInput') deleteCourseInput: DeleteCourseInput) {
    return this.coursesService.deleteCourse(deleteCourseInput);
  }
}