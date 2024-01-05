import { Injectable } from '@nestjs/common';
import { Semester, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSemesterInput } from './dto/update-semester.input';

@Injectable()
export class SemestersRepository {
  constructor(private prisma: PrismaService) {}

  async createSemester(params: {
    data: Prisma.SemesterCreateInput 
  }): Promise<Semester> {
    const { data } = params;
    return this.prisma.semester.create({
      data,
      include: {
        masterOnRooms: true,
        softwareCourses: true,
        softwareOnRooms: true,
        _count: true,
      }
    })
  }

  async getSemesters(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SemesterWhereUniqueInput,
    where?: Prisma.SemesterWhereInput,
    orderBy?: Prisma.SemesterOrderByWithRelationInput,
  }): Promise<Semester[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.semester.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        masterOnRooms: true,
        softwareCourses: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }

  async getSemesterById(params: {
    where: Prisma.SemesterWhereUniqueInput
  }): Promise<Semester> {
    const { where } = params;
    return this.prisma.semester.findUnique({
      where,
      include: {
        masterOnRooms: true,
        softwareCourses: true,
        softwareOnRooms: true,
        _count: true,
      }
    })
  }

  async updateSemester(params: UpdateSemesterInput): Promise<Semester> {
    const { id, name } = params;
    return this.prisma.semester.update({
      where: {
        id: id
      },
      data: {
        name: name,
        isActive: true,
      },
      include: {
        masterOnRooms: true,
        softwareCourses: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }

  async deleteSemesterById(params: {
    where: Prisma.SemesterWhereUniqueInput;
  }): Promise<Semester> {
    const { where } = params;
    return this.prisma.semester.delete({
      where,
      include: {
        masterOnRooms: true,
        softwareCourses: true,
        softwareOnRooms: true,
        _count: true,
      }
    });
  }
}