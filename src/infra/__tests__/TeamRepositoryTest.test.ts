// import { PrismaClient } from "@prisma/client";
import { prisma, PrismaClient } from ".prisma/client";
import { MemberEntity } from "../../domain/entity/MemberEntity";
import { Team } from "../../domain/entity/Team";
import { TeamName } from "../../domain/value/TeamName";
import { TeamRepositoryImpl } from "../repository/Team/TeamRepositoryImpl";
import { prismaMock } from "../singleton";
import { allTeam, manyTeam, memberInfo1, memberInfo2, oneTeam, teamMemberCountAsc } from "./dummyData";

describe("TeamRepository", () => {

    const teamRepo: TeamRepositoryImpl = new TeamRepositoryImpl();

    const prisma = new PrismaClient();

    describe("read", () => {

        test('全チーム検索、チームエンティティが返される事を確認', async () => {
            prismaMock.team.findMany.mockResolvedValue(allTeam)
            const teams = await teamRepo.getAllTeam();

            expect((teams)[0].members[0].name).toBe('higami')
        })

        test('複数チーム条件付き検索、チームエンティティが返される事を確認', async () => {
            prismaMock.team.findMany.mockResolvedValue(manyTeam)
            const teams = await teamRepo.getManyTeam(new TeamName(222));

            expect((teams)[0].members[0].name).toBe('higami')
        })

        test('1チーム条件付き検索、チームエンティティが返される事を確認', async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            const team = await teamRepo.getOneTeam(new TeamName(2));

            expect(team.members[0].name).toBe('higami')
        })

        test('1チーム条件付き検索、チームエンティティが返される事を確認', async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            const team = await teamRepo.getOneTeam(new TeamName(2));
            expect(team.members[0].name).toBe('higami')
        })

        test('1チーム条件付き検索、チームエンティティが返される事を確認', async () => {
            const a = await prisma.team.count({
                where: {
                    name: 200
                }
            })

            console.log(a)

            // prismaMock.team.findMany.mockResolvedValue(oneTeam)
            // const team = await teamRepo.getOneTeam(new TeamName(2));
            // expect(team.members[0].name).toBe('higami')
        })

    })

    describe("create", () => {
        const mEntity1 = MemberEntity.factory(memberInfo1);
        const mEntity2 = MemberEntity.factory(memberInfo2);
        const members = [mEntity1, mEntity2]
        const teamName = new TeamName(222)

        test('チーム登録、登録したチームエンティティが返される事を確認', async () => {
            prismaMock.team.create.mockResolvedValue({ id: 10, name: 222 });

            const team = await teamRepo.createOneTeam(teamName, [mEntity1, mEntity2])

            expect(team.teamName.name).toBe(222)
            expect(team.members.length).toBe(2)
        })

        test("チームメンバーを追加。中間テーブル：チームメンバーへ直接登録", async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            prismaMock.teamMembers.createMany.mockResolvedValue({ count: 1 })

            const result = await teamRepo.addMember(3, members)
            expect(result).toBe(true)
        })
    })

    describe("delete", () => {
        const mEntity1 = MemberEntity.factory(memberInfo1);
        const mEntity2 = MemberEntity.factory(memberInfo2);
        const members = [mEntity1, mEntity2]
        const teamName = new TeamName(999)

        test("チームメンバーの削除。中間テーブル：チームメンバーへ直接削除", async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            prismaMock.teamMembers.deleteMany.mockResolvedValue({ count: 1 })

            const result = await teamRepo.deleteMember(3, members)
            expect(result).toBe(true)
        })
    })

})

