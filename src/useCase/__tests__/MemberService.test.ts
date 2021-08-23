import { Member } from "../../domain/entity/Member";
import { ZaisekiStatus } from "../../domain/value/ZaisekiStatus";
import prisma from "../../infra/client";
import { MemberRepository } from "../../infra/repository/member/MemberRepository";
import { MemberRepositoryImpl } from "../../infra/repository/member/MemberRepositoryImpl";
import { MemberRepositoryImplStub } from "../../infra/repository/member/MemberRepositoryImplStub";
import { prismaMock } from "../../infra/singleton";
import { MemberService } from "../MemberService";

describe("memberService", () => {

    // const repo: MemberRepository = new MemberRepositoryImplStub();
    const repo: MemberRepository = new MemberRepositoryImpl();
    const service: MemberService = new MemberService(repo);

    const memerData = {
        id: 1,
        name: "higami",
        mailAddress: "aaa.com",
        zaisekiStatus: ZaisekiStatus.Zaiseki
    }

    test('メンバー検索', async () => {
        prismaMock.member.findUnique.mockResolvedValue(memerData)
        const member = await service.getUniqueMember(1);
        expect(member.name).toBe("higami")
    })

    test('検索失敗', async () => {
        //エラーメッセージで確認したかったが、できなかったので、インスタンスで比較した。
        expect(service.getUniqueMember(999999999999)).rejects.toEqual(new Error('メンバーがいません'))
    })

    test('更新失敗', async () => {
        memerData.id = 11111111111111;
        expect(service.updateMember(memerData)).rejects.toEqual(new Error('メンバーがいません'))
    })

    test('更新成功', async () => {
        prismaMock.member.findUnique.mockResolvedValue(memerData)

        const updateData = {
            id: 1,
            name: "updateName",
            mailAddress: "update.com",
            zaisekiStatus: ZaisekiStatus.Taikai
        }
        prismaMock.member.update.mockResolvedValue(updateData)
        const updatedMember = await service.updateMember(updateData)

        expect(updatedMember?.name).toBe("updateName")
    })

    test('更新失敗', async () => {

        const updateData = {
            id: 1,
            name: "updateName",
            mailAddress: "update.com",
            zaisekiStatus: ZaisekiStatus.Taikai
        }

        expect(service.updateMember(updateData)).rejects.toThrow('メンバーがいません')
    })

    test('登録成功', async () => {
        prismaMock.member.findUnique.mockResolvedValue(memerData)

        const createData = {
            id: 1,
            name: "updateName",
            mailAddress: "update.com",
            zaisekiStatus: ZaisekiStatus.Taikai
        }
        prismaMock.member.create.mockResolvedValue(createData)
        const createdMember = await service.createMember(createData)

        expect(createdMember?.name).toBe("updateName")
    })

    test('更新失敗', async () => {


    })
})