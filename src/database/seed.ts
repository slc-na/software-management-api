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
            description: "undefined",
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

    const internetUsageTypes = [
        { name: '-', id: '1' },
        { name: 'no', id: '2' },
        { name: 'yes', id: '3' }
    ];

    for (const usageType of internetUsageTypes) {
        await prisma.internetUsageType.upsert({
            where: { id: usageType.id },
            update: {},
            create: {
                name: usageType.name,
                id: usageType.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }


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

    const GeneralBlack = ["0"];
    const GeneralSilver = ["602", "604", "606", "608", "609", "610", "630", "631", "721", "722", "723", "724", "725", "727", "729", "622", "624", "626", "628"];
    const HighSpec = ["706", "708", "710"];
    const MultiMedia = ["621", "623", "625", "627", "629"];
    const Bahasa = ["605", "613", "614", "730", "731"];
    const Network = ['601', '603'];
    const MacOs = ['711a'];
    
    const roomCategories = {
        "General Black": GeneralBlack,
        "General Silver": GeneralSilver,
        "High Spec": HighSpec,
        "Multi Media": MultiMedia,
        "Bahasa": Bahasa,
        "Network": Network,
        "MacOs": MacOs
    };
    
    for (const [description, roomNames] of Object.entries(roomCategories)) {
        for (const name of roomNames) {
            await prisma.room.upsert({
                where: { id: name },
                update: {},
                create: {
                    description,
                    name: description, 
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: name,
                }
            });
        }
    }


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