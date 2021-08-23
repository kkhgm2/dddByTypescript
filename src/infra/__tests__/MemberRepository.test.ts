import { Member } from "../../domain/entity/Member";
import { ZaisekiStatus } from "../../domain/value/ZaisekiStatus";
import { MemberRepository } from "../repository/member/MemberRepository";
import { MemberRepositoryImpl } from "../repository/member/MemberRepositoryImpl";
import { prismaMock } from "../singleton";


describe("MemberRepository", () => {

    const memerData = {
        id: 1,
        name: "higami",
        mailAddress: "aaa.com",
        zaisekiStatus: ZaisekiStatus.Zaiseki
    }

    const repo: MemberRepository = new MemberRepositoryImpl();

    test('メンバー検索', async () => {
        prismaMock.member.findUnique.mockResolvedValue(memerData)
        const member = repo.getUniqueMember(1)

        expect((await member).name).toBe("higami")
    })

    test('検索失敗', async () => {
        //エラーメッセージで確認したかったが、できなかったので、インスタンスで比較した。
        expect(repo.getUniqueMember(999999999999)).rejects.toEqual(new Error('メンバーがいません'))
    })

    test('メンバー登録', async () => {
        memerData.name = 'create!!'
        prismaMock.member.create.mockResolvedValue(memerData)
        const memberObj = Member.factory(memerData)
        const createResult = repo.createMember(memberObj)

        expect((await createResult).name).toBe("create!!")
    })
})