import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SoftwareCourse } from "@prisma/client";
import { SoftwareCoursesRepository } from "./software-courses.repository";
import { SelectSoftwareCourseByIdInput } from "./dto/select-software-course-by-id.input";
import { UpdateSoftwareCourseInput } from "./dto/update-software-course.input";
import { DeleteSoftwareCourseInput } from "./dto/delete-software-course.input";
import { SelectSoftwareCourseBySemesterInput } from "./dto/select-software-course-by-semester-input";
import { CloneSoftwareCourseInput } from "./dto/clone-software-course.input";
import { SoftwareCourseBulkInput } from "./dto/software-course-bulk-input";
import { CreateSoftwareBySemesterInput } from "./dto/create-software-by-semester.input";
import { CreateCourseBySemesterInput } from "./dto/create-course-by-semester.input";

@Injectable()
export class SoftwareCoursesService {



  constructor(private repository: SoftwareCoursesRepository) {}

  async createSoftwareCourse(params: { softwareId: SoftwareCourse['softwareId'], courseId: SoftwareCourse['courseId'], semesterId: SoftwareCourse['semesterId'] }) {
    
    if(params.courseId == null){return this.createCourseBySemester(params);}
    // if(params.softwareId == null){return this.createSoftwareBySemester(params);}
    
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

  async createSoftwareBySemester(createSoftwareBySemesterInput: CreateSoftwareBySemesterInput) {
    return await this.repository.createSoftwareBySemester(createSoftwareBySemesterInput);
  }
  
  async createCourseBySemester(createCourseBySemesterInput: CreateCourseBySemesterInput) {
    return await this.repository.createCourseBySemester(createCourseBySemesterInput);
  }
  
  async getSoftwareCourses() {
    return await this.repository.getSoftwareCourses({});
  }

  async getSoftwareCoursesBySemester(selectSoftwareCourseBySemester: SelectSoftwareCourseBySemesterInput) {
    return await this.repository.getSoftwareCoursesBySemester(selectSoftwareCourseBySemester);
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

  async cloneSoftwareCourse(params: CloneSoftwareCourseInput){
    return this.repository.cloneSoftwareCourse(params);
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

  async inputSoftwareCourseBulk(params: SoftwareCourseBulkInput) {
    const singleCourse = params.courseIds.length == 1; const singleSoftware = params.softwareIds.length == 1
    
    if(singleCourse || singleSoftware && !(singleCourse && singleSoftware)){
      
      const semester = params.semesterId
      
      if(singleCourse){
        const data:SoftwareCourse[] = singleCourse ? 
        params.softwareIds.map((ids) =>({
          softwareId: ids,
          courseId:  params.courseIds[0],
          semesterId: semester,
          updatedAt:null,
          createdAt:null
        })) : 
        params.courseIds.map((ids) =>({
          softwareId: params.softwareIds[0],
          courseId: ids,
          semesterId: semester,
          updatedAt:null,
          createdAt:null
        }))
      return this.repository.createManySoftwareCourse(data);
      }

    throw new HttpException("software-course bad input, make sure only pass one multiple array", HttpStatus.BAD_REQUEST);

    }
  }

}