import { Member } from "../../domain/entity/Member";
import { MemberRepository } from "../repository/member/MemberRepository";
import { MemberRepositoryImplStub } from "../repository/member/MemberRepositoryImplStub";


describe("MemberRepository", () => {
    test('メンバー検索', async () => {
        const repo: MemberRepository = new MemberRepositoryImplStub();
        const member = await repo.getUniqueMember(1)

        expect(member.name).toBe("stub")
    })

    test('検索失敗', async () => {
        const repo: MemberRepository = new MemberRepositoryImplStub();
        expect(repo.getUniqueMember(2)).rejects.toEqual(new Error('メンバーがいません'))
    })
})