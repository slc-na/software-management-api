import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSoftwareInput } from '../softwares/dto/create-software.input';
import { CreateDepartmentInput } from '../departments/dto/create-department.input'
import { CreateGroupInput } from '../groups/dto/create-group.input';
import { RecapMapping } from './dto/recap-mapping.input';
import { MasterMapping } from './dto/master-mapping.input';
import { Room } from '../rooms/rooms.model';

@Injectable()
export class RecapsRepository {

    async mapRecap(mapInput: RecapMapping, semesterId: string) {
        try {
            const currentSemester = semesterId ?
                semesterId :
                (await this.prisma.semester.findMany({ take: -1 })).at(0).id

            // connect software with group
            const { courseId, groupId, rooms, softwareId } = mapInput
            if (softwareId != "-1" && groupId != "-1") {
                try {
                    await this.prisma.software.update({
                        where: {
                            id: softwareId
                        },
                        data: {
                            groupId: groupId
                        }
                    });
                } catch (error) {
                    if (error.code != "P2002")
                        console.log(error);

                }
            }

            // connect software with master
            if (softwareId != "-1") {
                console.log(rooms);
                rooms.map(async master => {
                    if (master != null) {
                        try {
                            await this.prisma.softwareOnRoom.create({ data: { softwareId: softwareId, roomId: master.id, semesterId: semesterId } })
                        } catch (error) {
                            if (error.code != "P2002")
                                console.log(error);

                        }
                    }
                })
            }


            // create software course
            if ((softwareId != undefined && softwareId != "-1") && (courseId != undefined && courseId != "-1")) {
                try {
                    const fin = await this.prisma.softwareCourse.create({
                        data: {
                            software: {
                                connect: {
                                    id: softwareId
                                }
                            },
                            course: {
                                connect: {
                                    id: courseId
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


                    console.log(fin);
                } catch (error) {
                    console.log(error);
                    if (error.code != "P2002")
                        console.log(error);
                }

            }
        } catch (error) {
            return -1
        }

    }


    async getMasterMapping(master: MasterMapping) {
        const mapping = ["General Black", "General Silver", "Bahasa", "Network", "Multi Media", "High Spec", "MacOs"];
        try {
            const keys = Object.keys(master)
            const masterMap: Room[] = await Promise.all(
                Object.keys(keys).map(async masterName => {
                    const param = master[keys[masterName]] == "v" ? mapping[masterName] : undefined
                    const roomId = await this.prisma.room.findFirst({ where: { description: param } });
                    return roomId ? { id: roomId.id, name: masterName, createdAt: new Date(), updatedAt: new Date(), description: roomId.description, softwareOnRooms: null } : null;
                })
            );
            return masterMap;
        } catch (error) {
            if (error.code != "P2002")
                console.log(error);
            return new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
        }
    }
    async getInternetUsageFromRecap(params: { name: string; }) {
        try {
            const data = await this.prisma.internetUsageType.findFirst({
                where: {
                    name: params.name
                }
            })
            if (data == undefined) {
                const data = await this.prisma.internetUsageType.findFirst({ where: { name: "No Internet" } });
                return data.id
            }
            return data.id
        } catch (error) {
            const data = await this.prisma.internetUsageType.findFirst({ where: { name: "No Internet" } });
            return data.id
        }
    }

    constructor(private prisma: PrismaService) { }

    async createSoftwareFromRecap(params: CreateSoftwareInput) {
        try {
            if (params.numberOfLicense == undefined || !params.numberOfLicense) {
                params.numberOfLicense = 0
            }
            const data = await this.prisma.software.findFirst({
                where: {
                    name: params.name,
                    version: params.version,
                    license: params.license,
                    numberOfLicense: params.numberOfLicense,
                    currentLicense: params.currentLicense,
                    link: params.link,
                    groupId: params.groupId,
                }
            })
            if (!data) {
                return (await this.prisma.software.create({
                    data: {
                        name: params.name,
                        version: params.version,
                        license: params.license,
                        numberOfLicense: params.numberOfLicense,
                        currentLicense: params.currentLicense,
                        link: params.link,
                        installerPath: params.installerPath,
                        group: {
                            connect: {
                                id: params.groupId
                            }
                        }
                    }
                })).id
            }
            return data.id
        } catch (error) {
            if (error.code != "P2002")
                console.log(error);
            return new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
        }
    }

    async createGroupFromRecap(params: CreateGroupInput) {
        try {
            const data = await this.prisma.group.findFirst({
                where: {
                    name: {
                        equals: params.name
                    }
                }
            })
            if (data == undefined) {
                return (await this.prisma.group.create({ data: params })).id
            }
            return data.id
        } catch (error) {
            if (error.code != "P2002")
                console.log(error);
            return new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
        }
    }

    async createDepartmentFromRecap(params: CreateDepartmentInput) {
        if (params == undefined) return
        try {
            const data = await this.prisma.department.findFirst({
                where: {
                    name: {
                        equals: params.name
                    }
                }
            })

            if (data == undefined || data == null) {
                console.log("DATA", data);
                return (await this.prisma.department.create({ data: params })).id
            }
            return data.id
        } catch (error) {
            if (error.code != "P2002")
                console.log(error);
            return new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
        }
    }

    async createCourseFromRecap(params, departmentId: string, internetUsageTypeId) {
        if (params == "" || params == undefined) return
        try {
            const code = params.split("-");
            const data = await this.prisma.course.findFirst({ where: { code: code[0], name: code[1] } })
            if (!data) {
                return (await this.prisma.course.create({ data: { code: code[0], name: code[1], departmentId: departmentId, internetUsageTypeId: internetUsageTypeId } })).id
            }
            console.log(data);

            return data.id
        } catch (error) {
            if (error.code != "P2002")
                console.log(error);
            return new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
        }
    }

} 