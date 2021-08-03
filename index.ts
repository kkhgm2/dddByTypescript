import { PrismaClient } from ".prisma/client";
// import { User } from "@prisma/client";
import { create } from "domain";
import { User } from "./User";

const prisma = new PrismaClient();

async function main() {
    // const user = await prisma.user.findFirst({})  
    // console.log(user)
    // console.log(user?.id)

    

    
    // const team = await prisma.team.create({
    //     data: {
    //         name:"team1",
    //     }
    // })

    const team = await prisma.team.findFirst();
    let teamid = team ? team.id : 1;

    // const createUser = await prisma.user.create({
    //     data: {
    //         name: "user2",
    //         teams: {
    //             create:[
    //                 {
    //                     teamId:teamid,
    //                 }
    //             ]
    //         }
    //     }
    // })

    
    console.log(team)
    // console.log(createUser)

    const users = await prisma.user.findMany();
    // console.log(...teams)
    users.map((user) => {
        const newUser = new User(user);
        console.log(newUser)
    })

}

main().catch((e) => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect()
})