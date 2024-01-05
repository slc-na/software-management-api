import { Injectable } from "@nestjs/common";
import { SoftwareCourse } from "@prisma/client";
import { SoftwareCoursesRepository } from "./software-courses.repository";
import { SelectSoftwareCourseByIdInput } from "./dto/select-software-course-by-id.input";
import { UpdateSoftwareCourseInput } from "./dto/update-software-course.input";
import { DeleteSoftwareCourseInput } from "./dto/delete-software-course.input";

@Injectable()
export class SoftwareCoursesService {
  constructor(private repository: SoftwareCoursesRepository) {}

  async createSoftwareCourse(params: { softwareId: SoftwareCourse['softwareId'], courseId: SoftwareCourse['courseId'], semesterId: SoftwareCourse['semesterId'] }) {
    const { softwareId, courseId, semesterId } = params;
    return await this.repository.createSoftwareCourse({
      data: {
        software: {
          connect: {
            id: softwareId
          }
        },
        course: {
          connect: {
            id: courseId
          }
        },
        semester: {
          connect: {
            id: semesterId
          }
        }
      }
    });
  }

  async getSoftwareCourses() {
    return await this.repository.getSoftwareCourses({});
  }

  async getSoftwareCourseById(params: SelectSoftwareCourseByIdInput) {
    return this.repository.getSoftwareCourseById({
      where: {
        softwareId_courseId_semesterId: {
          courseId: params.courseId,
          semesterId: params.semesterId,
          softwareId: params.softwareId
        }
      },
    });
  }

  async updateSoftwareCourse(params: UpdateSoftwareCourseInput) {
    return this.repository.updateSoftwareCourse(params);
  }

  async deleteSoftwareCourse(params: DeleteSoftwareCourseInput) {
    return this.repository.deleteSoftwareCourseById({
      where: {
        softwareId_courseId_semesterId: {
          courseId: params.courseId,
          semesterId: params.semesterId,
          softwareId: params.softwareId
        }
      },
    });
  }
}