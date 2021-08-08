import { MemberRepository } from "../../infra/repository/MemberRepository";
import { MemberRepositoryImplStub } from "../../infra/repository/MemberRepositoryImplStub";
import { MemberService } from "../MemberService";

describe("memberService", () => {

    const repo: MemberRepository = new MemberRepositoryImplStub();
    const service: MemberService = new MemberService(repo);

    test('メンバー検索', async () => {
        const member = await service.getMembers(1);
        expect(member.name).toBe("stub")
    })

    test('検索失敗', async () => {
        //エラーメッセージで確認したかったが、できなかったので、インスタンスで比較した。
        expect(service.getMembers(2)).rejects.toEqual(new Error('メンバーがいません'))
    })
})