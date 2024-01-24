import { Injectable } from '@nestjs/common';
import { SoftwareCourse, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareCourseInput } from './dto/update-software-course.input';
import { SelectSoftwareCourseBySemesterInput } from './dto/select-software-course-by-semester-input';
import { CloneSoftwareCourseInput } from './dto/clone-software-course.input';

@Injectable()
export class SoftwareCoursesRepository {
  
  constructor(private prisma: PrismaService) {}

  async createSoftwareCourse(params: {
    data: Prisma.SoftwareCourseCreateInput 
  }): Promise<SoftwareCourse> {
    const { data } = params;
    return this.prisma.softwareCourse.create({
      data,
      include: {
        course: true,
        semester: true,
        software: true,
      }
    })
  }

  async getSoftwareCourses(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SoftwareCourseWhereUniqueInput,
    where?: Prisma.SoftwareCourseWhereInput,
    orderBy?: Prisma.SoftwareCourseOrderByWithRelationInput,
  }): Promise<SoftwareCourse[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.softwareCourse.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        course: true,
        semester: true,
        software: true,
      }
    });
  }

  async cloneSoftwareCourse(cloneSoftwareCourseInput: CloneSoftwareCourseInput) {
    const { currentSemester, targetSemester } = cloneSoftwareCourseInput;

    const results = await this.prisma.softwareCourse.findMany({
      where:{
        semester: {
          id: targetSemester
        }
      }
    });

    const data = results.map((softwareCourse) =>({
        courseId: softwareCourse.courseId,
        softwareId: softwareCourse.softwareId,
        semesterId: targetSemester
    }))
    console.log(data);
    
    return this.prisma.softwareCourse.createMany({
      data: data
    })

  }

  async getSoftwareCourseById(params: {
    where: Prisma.SoftwareCourseWhereUniqueInput
  }): Promise<SoftwareCourse> {
    const { where } = params;
    return this.prisma.softwareCourse.findUnique({
      where,
      include: {
        course: true,
        semester: true,
        software: true,
      }
    })
  }

  getSoftwareCoursesBySemester(selectSoftwareCourseBySemester: SelectSoftwareCourseBySemesterInput) {
    const { currentSemesterId, orderBy, orderProperty, orderDirection, skip, take, search } = selectSoftwareCourseBySemester;

    return this.prisma.softwareCourse.findMany({
      where: {
        semesterId: currentSemesterId,
        semester:{
          name:  { contains: search, mode: 'insensitive' } 
        }
      },
      orderBy: orderBy
        ? 
          [{
            [orderBy]: {
              [orderProperty]: orderDirection || 'asc', // Default to 'asc' if orderDirection is not provided
            }}]  
          // [orderBy]: orderDirection || 'asc', // Default to 'asc' if orderDirection is not provided
          
        : undefined,
      skip,
      take,
      include: {
        course: true,
        semester: true,
        software: true,
      },
    });
  }

  async updateSoftwareCourse(params: UpdateSoftwareCourseInput): Promise<SoftwareCourse> {
    const { newSoftwareId, newCourseId, newSemesterId,  oldSoftwareId, oldCourseId, oldSemesterId } = params;
    return this.prisma.softwareCourse.update({
      where: {
        softwareId_courseId_semesterId: {
          courseId: oldCourseId,
          semesterId: oldSemesterId,
          softwareId: oldSoftwareId
        }
      },
      data: {
        course: {
          connect: {
            id: newCourseId
          }
        },
        software: {
          connect: {
            id: newSoftwareId
          }
        },
        semester: {
          connect: {
            id: newSemesterId
          }
        }
      },
      include: {
        course: true,
        semester: true,
        software: true,
      }
    });
  }

  async deleteSoftwareCourseById(params: {
    where: Prisma.SoftwareCourseWhereUniqueInput;
  }): Promise<SoftwareCourse> {
    const { where } = params;
    return this.prisma.softwareCourse.delete({
      where,
      include: {
        course: true,
        semester: true,
        software: true,
      }
    });
  }
}