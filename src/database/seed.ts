import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const default_semester = await prisma.semester.upsert({
        where: { id: '1' },
        update: {},
        create: {
            isActive: true,
            name: 'Default Semester',
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    })

    const default_group = await prisma.group.upsert({
        where: { id: '1' },
        update: {},
        create: {
            name: 'Default Group',
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    })

    const default_software = await prisma.software.upsert({
        where: { id: '1' },
        update: {},
        create: {
            currentLicense: '1',
            installerPath: 'C:/',
            license: 'MIT',
            name: 'Prisma',
            numberOfLicense: 1,
            version: '2.0',
            createdAt: new Date(),
            updatedAt: new Date(),
            groupId: '1',
            link: 'https://prisma.io',
            id: '1',
            note: 'This is a note',
        },
    })
    const default_room = await prisma.room.upsert({
        where: { id: '1' },
        update: {},
        create: {
            description: "undefind",
            name: 'Default Room',
            createdAt: new Date(),
            updatedAt: new Date(),
            id: '1',
        }
    })

    const default_department = await prisma.department.upsert({
        where: { id: '1' },
        update: {},
        create: {
            name: 'Default Department',
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    const default_internet_usage = await prisma.internetUsageType.upsert({
        where: { id: '1' },
        update: {},
        create: {
            name: 'Default Internet Usage',
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    const default_course = await prisma.course.upsert({
        where: { id: '1' },
        update: {},
        create: {
            name: 'Default Course',
            departmentId: '1',
            internetUsageTypeId: '1',
            code: '1',
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })