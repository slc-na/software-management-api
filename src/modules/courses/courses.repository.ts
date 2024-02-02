import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCourseInput } from './dto/update-course.input';
import { CoursesCount } from './courses-count.model';
import { SearchCoursesInput } from './dto/search-courses.input';
import { SelectCoursesInput } from './dto/select-courses.input';
import { CreateCourseInput } from './dto/create-course.input';

@Injectable()
export class CoursesRepository {
  constructor(private prisma: PrismaService) { }

  async createCourse(params: CreateCourseInput): Promise<Course> {
    const { code, departmentId, internetUsageTypeId, name, semesterId } = params;
      return this.prisma.course.create({
        data:{
          code:code,
          departmentId:departmentId,
          internetUsageTypeId:internetUsageTypeId,
          name:name
        }
      })
  }

  async updateCourse(params: UpdateCourseInput): Promise<Course> {
    const { code, departmentId, internetUsageTypeId, name, newCode, newDepartmentId, newInternetUsageTypeId, newName, semesterId } = params;
      
    const result = await this.prisma.course.findFirst({
      where:{
        code:code,
        departmentId:departmentId,
        internetUsageTypeId:internetUsageTypeId,
        name:name
      }
    })

    if(result){
      return this.prisma.course.update({
        where:result,
        data: {
          code: newCode,
          departmentId: newDepartmentId,
          internetUsageTypeId: newInternetUsageTypeId,
          name: newName
        },
      })
    }else{
      throw new HttpException("Data not found", HttpStatus.NOT_FOUND);
    }

  }

  async getCoursesCount(): Promise<CoursesCount> {
    const count = await this.prisma.course.count();
    return { count };
  }

  async getCourses(selectCoursesInput: SelectCoursesInput): Promise<{ courses: Course[]; count: number }> {
    const { search, orderBy, orderDirection, skip, take, orderProperty, semesterId } = selectCoursesInput;

    const where: Prisma.CourseWhereInput = {
      AND: [ 
        search
          ? {
              OR: [
                { code: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}, 
        semesterId ? { 
          softwareCourses: {
            some: {
              semester: {
                id: semesterId,
              },
            },
          },
        } : {}, 
      ],
    };

    const course_query = await this.prisma.course.findMany({
      where,
    });

    console.log(course_query);


    const courses = await this.prisma.course.findMany({
      where,
      orderBy: orderBy ?
        orderProperty
          ? {
            [orderBy]: {[orderProperty] : orderDirection || 'asc'},
          }
        : {[orderBy] : orderDirection || 'asc'}:
        undefined,
      skip,
      take,
      include: {
        department: true,
        internetUsageType: true,
        softwareCourses: {
          include:{
            semester:true
          }
        },
        _count: true,
      },
    });

    const count = course_query.length;

    return { courses, count };
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