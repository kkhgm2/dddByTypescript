import { Member } from "../../domain/entity/Member";
import { MemberRepository } from "../repository/MemberRepository"
import { MemberRepositoryImplStub } from "../repository/MemberRepositoryImplStub"


describe("MemberRepository", () => {
    test('メンバー検索', async () => {
        const repo: MemberRepository = new MemberRepositoryImplStub();
        const member = await repo.getUniqueMember(1)

        expect(member.name).toBe("stub")
    })

    test('検索失敗', async () => {
        const repo: MemberRepository = new MemberRepositoryImplStub();
        repo.getUniqueMember(2)
        expect(repo.getUniqueMember(2)).resolves
            .toThrow("メールアドレスが重複しています");
    })
})