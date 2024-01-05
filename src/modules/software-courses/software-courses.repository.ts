import { Injectable } from '@nestjs/common';
import { SoftwareCourse, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareCourseInput } from './dto/update-software-course.input';

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

  async updateSoftwareCourse(params: UpdateSoftwareCourseInput): Promise<SoftwareCourse> {
    const { softwareId, courseId, semesterId } = params;
    return this.prisma.softwareCourse.update({
      where: {
        softwareId_courseId_semesterId: {
          courseId: courseId,
          semesterId: semesterId,
          softwareId: softwareId
        }
      },
      data: {
        course: {
          connect: {
            id: courseId
          }
        },
        software: {
          connect: {
            id: softwareId
          }
        },
        semester: {
          connect: {
            id: semesterId
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