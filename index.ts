import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst({})  
    console.log(user)
    console.log(user?.id)

    

    
    const team = await prisma.team.create({
        data: {
            name:"team1",
        }
    })

}

main().catch((e) => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect()
})