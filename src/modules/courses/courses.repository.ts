import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCourseInput } from './dto/update-course.input';




@Injectable()
export class CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async createCourse(params: {
    data: Prisma.CourseCreateInput 
  }): Promise<Course> {
    const { data } = params;
    return this.prisma.course.create({
      data,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      }
    })
  }

  async getCourses(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.CourseWhereUniqueInput,
    where?: Prisma.CourseWhereInput,
    orderBy?: Prisma.CourseOrderByWithRelationInput,
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.course.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      }
    });
  }

  async getCourseById(params: {
    where: Prisma.CourseWhereUniqueInput
  }): Promise<Course> {
    const { where } = params;
    return this.prisma.course.findUnique({
      where,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      }
    })
  }

  async updateCourse(params: UpdateCourseInput): Promise<Course> {
    const { id, code, name, departmentId, internetUsageTypeId } = params;
    return this.prisma.course.update({
      where: {
        id: id
      },
      data: {
        code: code,
        name: name,
        department: {
          connect: {
            id: departmentId
          }
        },
        internetUsageType: {
          connect: {
            id: internetUsageTypeId
          }
        },
      },
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      }
    });
  }

  async deleteCourseById(params: {
    where: Prisma.CourseWhereUniqueInput;
  }): Promise<Course> {
    const { where } = params;
    return this.prisma.course.delete({
      where,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      }
    });
  }
}