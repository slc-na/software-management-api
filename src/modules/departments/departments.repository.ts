import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { DepartmentsCount } from './departments-count.model';
import { SearchDepartmentsInput } from './dto/search-departments.input';

@Injectable()
export class DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  async createDepartment(params: {
    data: Prisma.DepartmentCreateInput 
  }): Promise<Department> {
    const { data } = params;
    return this.prisma.department.create({
      data,
      include: {
        courses: true,
        _count: true
      }
    })
  }

  async getDepartmentsCount(): Promise<DepartmentsCount> {
    const count = await this.prisma.department.count();
    return { count };
  }

  async getDepartments(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.DepartmentWhereUniqueInput,
    where?: Prisma.DepartmentWhereInput,
    orderBy?: Prisma.DepartmentOrderByWithRelationInput,
  }): Promise<Department[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.department.findMany({ 
      skip, 
      take, 
      cursor, 
      where, 
      orderBy,
      include: {
        courses: true,
        _count: true
      }
    });
  }

  async getDepartmentById(params: {
    where: Prisma.DepartmentWhereUniqueInput
  }): Promise<Department> {
    const { where } = params;
    return this.prisma.department.findUnique({
      where,
      include: {
        courses: true,
        _count: true,
      }
    })
  }

  async searchDepartments(params: SearchDepartmentsInput): Promise<{ departments: Department[]; count: number }> {
    const departments = await this.prisma.department.findMany({
      where: {
        OR: [
          { name: { contains: params.query, mode: 'insensitive' } },
        ],
      },
      include: {
        courses: true,
        _count: true,
      }
    });

    const count = departments.length;

    return { departments, count };
  }

  async updateDepartment(params: UpdateDepartmentInput): Promise<Department> {
    const { id, name } = params;
    return this.prisma.department.update({
      where: {
        id: id
      },
      data: {
        name: name,
      },
      include: {
        courses: true,
        _count: true,
      }
    });
  }

  async deleteDepartmentById(params: {
    where: Prisma.DepartmentWhereUniqueInput;
  }): Promise<Department> {
    const { where } = params;
    return this.prisma.department.delete({
      where,
      include: {
        courses: true,
        _count: true,
      }
    });
  }
}