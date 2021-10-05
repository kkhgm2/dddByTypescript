import { PrismaClient } from "@prisma/client";
import { MemberEntity } from "../../domain/entity/MemberEntity";
import { Team } from "../../domain/entity/Team";
import { TeamName } from "../../domain/value/TeamName";
import { ZaisekiStatus } from "../../domain/value/ZaisekiStatus";
import { MemberRepository } from "../../infra/repository/member/MemberRepository";
import { MemberRepositoryImpl } from "../../infra/repository/member/MemberRepositoryImpl";
import { TeamRepository } from "../../infra/repository/Team/TeamRepository";
import { TeamRepositoryImpl } from "../../infra/repository/Team/TeamRepositoryImpl";
import { prismaMock } from "../../infra/singleton";
import { MemberService } from "../MemberService";
import { TeamService } from "../TeamServise";
import { allTeam, manyTeam, memberInfo1, oneTeam, teamMembers1 } from "./dummyData";

describe("teamService", () => {

    const teamRepo: TeamRepositoryImpl = new TeamRepositoryImpl();
    const memberRepo: MemberRepository = new MemberRepositoryImpl();
    const service: TeamService = new TeamService(teamRepo, memberRepo);
    const teamName = new TeamName(222)

    describe("read", () => {
        test('１チーム検索、条件検索', async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            const team = await service.getOneTeam(teamName);
            expect(team.teamName.name).toBe(10)
        })
        test('複数チーム、条件検索', async () => {
            prismaMock.team.findMany.mockResolvedValue(manyTeam)
            const team = await service.getManyTeam(teamName);
            expect(team[1].teamName.name).toBe(100)
        })
        test('全チーム検索', async () => {
            prismaMock.team.findMany.mockResolvedValue(allTeam)
            const team = await service.getAllTeam();
            expect(team[2].teamName.name).toBe(200)
        })
    })

    describe("create", () => {

        test('チーム名の重複', async () => {
            prismaMock.team.findMany.mockResolvedValue(oneTeam)
            const member = [MemberEntity.factory(memberInfo1)];
            expect(service.createTeam(teamName, member))
                .rejects.toEqual(new Error('チーム名が重複しています'))
        })
        test('メンバーが足りていない', async () => {
            const member = [MemberEntity.factory(memberInfo1)];
            const teamSpy = jest.spyOn(MemberRepositoryImpl.prototype, "getMembers")
                .mockReturnValueOnce(Promise.resolve(member))

            expect((service as any).checkInputedMember(member))
                .rejects.toEqual(new Error('入力されたメンバー数が足りていません。３人入力してください。'))

        })
        // test('入力されたメンバーが存在しない', async () => {
        //     const mEntity = MemberEntity.factory(memberInfo1);
        //     const members = [mEntity, mEntity, mEntity];
        //     const teamSpy = jest.spyOn(MemberRepositoryImpl.prototype, "getMembers")
        //         .mockReturnValueOnce(Promise.resolve(members))

        //     expect((service as any).checkInputedMember(members))
        //         .rejects.toEqual(new Error('入力されたメンバーが存在しません'))
        // })

        test('addMember', async () => {
            prismaMock.teamMembers.createMany.mockResolvedValue({ count: 0 })
            const member = [MemberEntity.factory(memberInfo1)];
            expect((service as any).addMember(1, member))
                .rejects.toEqual(new Error('追加に失敗しました。'))

        })
    })

})
