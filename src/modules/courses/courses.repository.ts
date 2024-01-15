import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCourseInput } from './dto/update-course.input';
import { CoursesCount } from './courses-count.model';
import { SearchCoursesInput } from './dto/search-courses.input';
import { SelectCoursesInput } from './dto/select-courses.input';




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

  async getCoursesCount(): Promise<CoursesCount> {
    const count = await this.prisma.course.count();
    return { count };
  }

  async getCourses(selectCoursesInput: SelectCoursesInput): Promise<{ courses: Course[]; count: number }> {
    const { search, orderBy, orderDirection, skip, take } = selectCoursesInput;

    const where: Prisma.CourseWhereInput = search
    ? {
        OR: [
          { code: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

    const courses = await this.prisma.course.findMany({
      where,
      orderBy: orderBy
        ? {
            [orderBy]: orderDirection || 'asc',
          }
        : undefined,
      skip,
      take,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      },
    });

    const count = courses.length;

    return {courses, count};
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

  async searchCourses(params: SearchCoursesInput): Promise<{ courses: Course[]; count: number }> {
    const courses = await this.prisma.course.findMany({
      where: {
        OR: [
          { code: { contains: params.query, mode: 'insensitive' } },
          { name: { contains: params.query, mode: 'insensitive' } },
        ],
      },
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: true,
        _count: true,
      },
    });

    const count = courses.length;

    return { courses, count };
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