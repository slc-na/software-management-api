import { Injectable } from '@nestjs/common';
import { Software, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSoftwareInput } from './dto/update-software.input';
import { SoftwaresCount } from './softwares-count.model';
import { SearchSoftwaresInput } from './dto/search-softwares.input';
import { SelectSoftwaresInput } from './dto/select-softwares.input';
import { SoftwaresWithCount } from './softwares-with-count.model';

@Injectable()
export class SoftwaresRepository {
  constructor(private prisma: PrismaService) { }

  async createSoftware(params: {
    data: Prisma.SoftwareCreateInput
  }): Promise<Software> {
    const { data } = params;
    return this.prisma.software.create({
      data,
      include: {
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true
      }
    })
  }

  async getSoftwaresCount(): Promise<SoftwaresCount> {
    const count = await this.prisma.software.count();
    return { count };
  }

  async getSoftwares(selectSoftwaresInput: SelectSoftwaresInput): Promise<{ softwares: Software[]; count: number }> {
    const { search, orderBy, orderDirection, skip, take, semesterId, orderProperty } = selectSoftwaresInput;

    const where: Prisma.SoftwareWhereInput = 
      {
        AND: [ 
          search
            ? {
                OR: [
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

      const software_query = await this.prisma.software.findMany({
        where,
      });

    const softwares = await this.prisma.software.findMany({
      where: where,
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
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true,
      },
    });

    const count = software_query.length;
    return {softwares, count};
  }

  async getSoftwareById(params: {
    where: Prisma.SoftwareWhereUniqueInput
  }): Promise<Software> {
    const { where } = params;
    return this.prisma.software.findUnique({
      where,
      include: {
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true
      }
    })
  }

  async searchSoftwares(params: SearchSoftwaresInput): Promise<{ softwares: Software[]; count: number }> {
    const softwares = await this.prisma.software.findMany({
      where: {
        OR: [
          { name: { contains: params.query, mode: 'insensitive' } },
        ],
      },
      include: {
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true
      }
    });

    const count = softwares.length;

    return { softwares, count };
  }

  async updateSoftware(params: UpdateSoftwareInput): Promise<Software> {
    const { id, name, note, installerPath, currentLicense, license, numberOfLicense, version } = params;
    return this.prisma.software.update({
      where: {
        id: id
      },
      data: {
        currentLicense: currentLicense,
        installerPath: installerPath,
        license: license,
        name: name,
        note: note,
        numberOfLicense: numberOfLicense,
        version: version,
      },
      include: {
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true
      }
    });
  }

  async deleteSoftwareById(params: {
    where: Prisma.SoftwareWhereUniqueInput;
  }): Promise<Software> {
    const { where } = params;
    return this.prisma.software.delete({
      where,
      include: {
        softwareCourses: true,
        softwareGroups: true,
        softwareMasters: true,
        softwareOnRooms: true,
        _count: true
      }
    });
  }
}