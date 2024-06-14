import { Injectable } from '@nestjs/common';
import { SoftwareCourse, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareCourseInput } from './dto/update-software-course.input';
import { SelectSoftwareCourseBySemesterInput } from './dto/select-software-course-by-semester-input';
import { CloneSoftwareCourseInput } from './dto/clone-software-course.input';
import { CreateSoftwareBySemesterInput } from './dto/create-software-by-semester.input';
import { randomUUID } from 'crypto';
import { CreateCourseBySemesterInput } from './dto/create-course-by-semester.input';
import { BulkUpdateSoftwareByCourseInput } from './dto/bulk-update-room-by-software.input';
import { BulkUpdateCourseBySoftwareInput } from './dto/bulk-update-course-by-software.input';

@Injectable()
export class SoftwareCoursesRepository {

  constructor(private prisma: PrismaService) { }

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

  async createManySoftwareCourse(params: SoftwareCourse[]) {
    return this.prisma.softwareCourse.createMany({
      data: params
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
      where: {
        semester: {
          id: currentSemester
        }
      }
    });

    const data = results.map((softwareCourse) => ({
      courseId: softwareCourse.courseId,
      softwareId: softwareCourse.softwareId,
      semesterId: targetSemester
    }))

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
        semester: {
          name: { contains: search, mode: 'insensitive' }
        }
      },
      orderBy: orderBy
        ?
        [{
          [orderBy]: {
            [orderProperty]: orderDirection || 'asc', // Default to 'asc' if orderDirection is not provided
          }
        }]
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

  async bulkUpdateSoftwareByCourse(params: BulkUpdateSoftwareByCourseInput) {
    console.log(params);

    const { data, courseId, semesterId } = params

    await this.prisma.softwareCourse.deleteMany({
      where: {
        courseId: courseId,
      }
    })

    data.map(async item => {
      if (item) {
        await this.prisma.softwareCourse.create({
          data: {
            courseId: courseId,
            semesterId: semesterId,
            softwareId: item
          }
        });
      }
    });

    return data.length
  }

  async bulkUpdateCourseBySoftware(params: BulkUpdateCourseBySoftwareInput): Promise<number> {


    const { data, softwareId, semesterId } = params

    await this.prisma.softwareCourse.deleteMany({
      where: {
        softwareId: softwareId,
      }
    })

    data.map(async item => {
      if (item) {
        await this.prisma.softwareCourse.create({
          data: {
            courseId: item,
            semesterId: semesterId,
            softwareId: softwareId
          }
        });
      }
    });
    console.log(data.length);

    return data.length
  }

  async createSoftwareBySemester(params: CreateSoftwareBySemesterInput): Promise<SoftwareCourse> {
    const { courseId, semesterId, groupId, link,
      name, version, license, numberOfLicense, currentLicense, installerPath, note } = params

    const roomId = "1";
    const currentCourseId = courseId == null ? "1" : courseId

    const currentSoftwareId = randomUUID();
    console.log(params);

    await this.prisma.software.create({
      data: {
        id: currentSoftwareId,
        name: name,
        version: version,
        license: license,
        numberOfLicense: numberOfLicense,
        currentLicense: currentLicense,
        installerPath: installerPath,
        link: link,
        note: note,
        softwareCourses: {
          connectOrCreate: {
            where: {
              softwareId_courseId_semesterId: {
                semesterId: semesterId,
                courseId: currentCourseId,
                softwareId: currentSoftwareId
              }
            },
            create: {
              semesterId: semesterId,
              courseId: currentCourseId,
            }
          }
        },
        group: {
          connect: {
            id: groupId
          }
        }
        ,
        softwareOnRooms: {
          connectOrCreate: {
            where: {
              softwareId_roomId_semesterId: {
                roomId: roomId,
                semesterId: semesterId,
                softwareId: currentSoftwareId
              }
            },
            create: {
              semesterId: semesterId,
              roomId: roomId,
            }
          }
        }
      },
    });



    const data = this.prisma.softwareCourse.findFirst({
      where: {
        courseId: currentCourseId,
        semesterId: semesterId,
        softwareId: currentSoftwareId
      }
    })


    return data

  }

  async createCourseBySemester(params: CreateCourseBySemesterInput): Promise<SoftwareCourse> {
    const { semesterId,
      name, code, departmentId, internetUsageTypeId, softwareId } = params

    const currentSoftwareId = softwareId ? softwareId : "2be0631c-f82d-4ffd-8771-d9b1b53131ad";
    const courseId = randomUUID();

    await this.prisma.course.create({
      data: {
        id: courseId,
        name: name,
        code: code,
        departmentId: departmentId,
        internetUsageTypeId: internetUsageTypeId,
        softwareCourses: {
          connectOrCreate: {
            where: {
              softwareId_courseId_semesterId: {
                semesterId: semesterId,
                courseId: courseId,
                softwareId: currentSoftwareId
              }
            },
            create: {
              semesterId: semesterId,
              softwareId: currentSoftwareId
            }
          }
        },
      },
    });


    return this.prisma.softwareCourse.findFirst({
      where: {
        courseId: courseId,
        semesterId: semesterId,
        softwareId: currentSoftwareId
      }
    })

  }

  async updateSoftwareCourse(params: UpdateSoftwareCourseInput): Promise<SoftwareCourse> {
    const { newSoftwareId, newCourseId, newSemesterId, oldSoftwareId, oldCourseId, oldSemesterId } = params;
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