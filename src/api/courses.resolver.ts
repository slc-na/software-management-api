import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CoursesCount } from "src/modules/courses/courses-count.model";
import { Course } from "src/modules/courses/courses.model";
import { CoursesService } from "src/modules/courses/courses.service";
import { CreateCourseInput } from "src/modules/courses/dto/create-course.input";
import { DeleteCourseInput } from "src/modules/courses/dto/delete-course.input";
import { SearchCoursesInput } from "src/modules/courses/dto/search-courses.input";
import { SelectCourseByIdInput } from "src/modules/courses/dto/select-course-by-id.input";
import { SelectCoursesInput } from "src/modules/courses/dto/select-courses.input";
import { UpdateCourseInput } from "src/modules/courses/dto/update-course.input";
import { SearchCoursesResult } from "src/modules/courses/search-courses-result.model";

@Resolver()
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => CoursesCount)
  async getCoursesCount() {
    return this.coursesService.getCoursesCount();
  }

  @Query(() => [Course])
  async getCourses(@Args('selectCoursesInput') selectCoursesInput: SelectCoursesInput) {
    return this.coursesService.getCourses(selectCoursesInput);
  }

  @Query(() => Course)
  async getCourseById(@Args('selectCourseByIdInput') selectCourseByIdInput: SelectCourseByIdInput) {
    return this.coursesService.getCourseById(selectCourseByIdInput);
  }

  @Query(() => SearchCoursesResult)
  async searchCourses(@Args('searchCoursesInput') searchCoursesInput: SearchCoursesInput) {
    return this.coursesService.searchCourses(searchCoursesInput);
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