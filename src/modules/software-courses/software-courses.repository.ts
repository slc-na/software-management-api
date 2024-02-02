import { Injectable } from '@nestjs/common';
import { SoftwareCourse, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareCourseInput } from './dto/update-software-course.input';
import { SelectSoftwareCourseBySemesterInput } from './dto/select-software-course-by-semester-input';
import { CloneSoftwareCourseInput } from './dto/clone-software-course.input';
import { CreateSoftwareCourseInput } from './dto/create-software-course.input';
import { CreateSoftwareBySemesterInput } from './dto/create-software-by-semester.input';
import { UUID, randomUUID } from 'crypto';

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

  async createSoftwareBySemester(params:CreateSoftwareBySemesterInput): Promise<SoftwareCourse> {
    const {courseId, semesterId, softwareId,
      name, version, license, numberOfLicense, currentLicense, installerPath, note } = params
      
      const roomId = "24acb0e8-f8f5-4e00-a6ae-1d06257e1f38";
      const masterID = "2f5321eb-43be-4223-81f7-977a5f7e3a6d";

      const id = softwareId ? softwareId : randomUUID();

      await this.prisma.software.create({
        data: {
          id: id,
          name: name,
          version: version,
          license: license,
          numberOfLicense: numberOfLicense,
          currentLicense: currentLicense,
          installerPath: installerPath,
          note: note,
          softwareCourses: {
            connectOrCreate: {
              where: {
                softwareId_courseId_semesterId: {
                  semesterId: semesterId,
                  courseId: courseId,
                  softwareId: id
                }
              },
              create: {
                semesterId: semesterId,
                courseId: courseId,
              }
            }
          },
          softwareOnRooms:{
            connectOrCreate:{
              where: {
                softwareId_roomId_semesterId: {
                  roomId: roomId,
                  semesterId:semesterId,
                  softwareId: id
                }
              },
              create: {
                semesterId: semesterId,
                roomId:roomId,
              }
            }
          }
        },
      });
      

    return this.prisma.softwareCourse.create({
      data:{
        courseId:courseId,
        semesterId:semesterId,
        softwareId:softwareId
      }
    })

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