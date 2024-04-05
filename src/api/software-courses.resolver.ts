import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CloneSoftwareCourseInput } from "src/modules/software-courses/dto/clone-software-course.input";
import { CreateCourseBySemesterInput } from "src/modules/software-courses/dto/create-course-by-semester.input";
import { CreateSoftwareBySemesterInput } from "src/modules/software-courses/dto/create-software-by-semester.input";
import { CreateSoftwareCourseInput } from "src/modules/software-courses/dto/create-software-course.input";
import { DeleteSoftwareCourseInput } from "src/modules/software-courses/dto/delete-software-course.input";
import { SelectSoftwareCourseByIdInput } from "src/modules/software-courses/dto/select-software-course-by-id.input";
import { SelectSoftwareCourseBySemesterInput } from "src/modules/software-courses/dto/select-software-course-by-semester-input";
import { SoftwareCourseBulkInput } from "src/modules/software-courses/dto/software-course-bulk-input";
import { UpdateSoftwareCourseInput } from "src/modules/software-courses/dto/update-software-course.input";
import { SoftwareCourse } from "src/modules/software-courses/software-courses.model";
import { SoftwareCoursesService } from "src/modules/software-courses/software-courses.service";

@Resolver()
export class SoftwareCoursesResolver {
  constructor(private readonly softwareCoursesService: SoftwareCoursesService) {}

  @Query(() => [SoftwareCourse])
  async getSoftwareCourses() {
    return this.softwareCoursesService.getSoftwareCourses();
  }

  @Query(() => [SoftwareCourse])
  async getSoftwareCoursesBySemester(@Args('selectSoftwareCourseBySemesterInput') selectSoftwareCourseBySemesterInput: SelectSoftwareCourseBySemesterInput) {
    return this.softwareCoursesService.getSoftwareCoursesBySemester(selectSoftwareCourseBySemesterInput);
  }

  @Query(() => SoftwareCourse)
  async getSoftwareCourseById(@Args('selectSoftwareCourseByIdInput') selectSoftwareCourseByIdInput: SelectSoftwareCourseByIdInput) {
    return this.softwareCoursesService.getSoftwareCourseById(selectSoftwareCourseByIdInput);
  }

  @Mutation(() => [SoftwareCourse])
  async cloneSoftwareCourse(@Args('cloneSoftwareCourseInput') cloneSoftwareCourseInput: CloneSoftwareCourseInput) {
    return this.softwareCoursesService.cloneSoftwareCourse(cloneSoftwareCourseInput);
  }

  @Mutation(() => SoftwareCourse)
  async createSoftwareCourse(@Args('createSoftwareCourseInput') createSoftwareCourseInput: CreateSoftwareCourseInput) {
    return this.softwareCoursesService.createSoftwareCourse(createSoftwareCourseInput);
  }

  @Mutation(() => SoftwareCourse)
  async updateSoftwareCourse(@Args('updateSoftwareCourseInput') updateSoftwareCourseInput: UpdateSoftwareCourseInput) {
    return this.softwareCoursesService.updateSoftwareCourse(updateSoftwareCourseInput);
  }

  @Mutation(() => SoftwareCourse)
  async deleteSoftwareCourse(@Args('deleteSoftwareCourseInput') deleteSoftwareCourseInput: DeleteSoftwareCourseInput) {
    return this.softwareCoursesService.deleteSoftwareCourse(deleteSoftwareCourseInput);
  }

  @Mutation(() => SoftwareCourse)
  async inputSoftwareCourseBulk(@Args('SoftwareCourseBulkInput') softwareCourseBulkInput:SoftwareCourseBulkInput){
    return this.softwareCoursesService.inputSoftwareCourseBulk(softwareCourseBulkInput)
  }

  @Mutation(() => SoftwareCourse)
  async createSoftwareBySemester(@Args('CreateSoftwareBySemesterInput') createSoftwareBySemesterInput:CreateSoftwareBySemesterInput){
    return this.softwareCoursesService.createSoftwareBySemester(createSoftwareBySemesterInput)
  }
  
  @Mutation(() => SoftwareCourse)
  async createCourseBySemester(@Args('CreateCourseBySemesterInput') createCourseBySemesterInput:CreateCourseBySemesterInput){
    return this.softwareCoursesService.createCourseBySemester(createCourseBySemesterInput)
  }

}