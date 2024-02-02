import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";
import { Course } from "@prisma/client";
import { SelectCourseByIdInput } from "./dto/select-course-by-id.input";
import { UpdateCourseInput } from "./dto/update-course.input";
import { DeleteCourseInput } from "./dto/delete-course.input";
import { SelectCoursesInput } from "./dto/select-courses.input";
import { SearchCoursesInput } from "./dto/search-courses.input";
import { CreateCourseInput } from "./dto/create-course.input";

@Injectable()
export class CoursesService {
  constructor(private repository: CoursesRepository) { }

  async createCourse(params: CreateCourseInput) {
    return await this.repository.createCourse(params);
  }

  async getCoursesCount() {
    return await this.repository.getCoursesCount();
  }

  async getCourses(params: SelectCoursesInput) {
    return await this.repository.getCourses(params);
  }

  async searchCourses(params: SearchCoursesInput) {
    return await this.repository.searchCourses(params);
  }

  async getCourseById(params: SelectCourseByIdInput) {
    return this.repository.getCourseById({
      where: params
    });
  }

  async updateCourse(params: UpdateCourseInput) {
    return this.repository.updateCourse(params);
  }

  async deleteCourse(params: DeleteCourseInput) {
    return this.repository.deleteCourseById({
      where: {
        id: params.id
      }
    });
  }
}