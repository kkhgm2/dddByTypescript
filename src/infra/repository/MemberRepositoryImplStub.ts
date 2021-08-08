import { Member } from "../../domain/entity/Member";
import { MemberRepository } from "./MemberRepository";

export class MemberRepositoryImplStub implements MemberRepository {
    public async getUniqueMember(memberId: number): Promise<Member> {
        let memberRecords;

        if (memberId != 1) {
            memberRecords = null;
        } else {
            memberRecords = {
                id: 1,
                name: "stub",
                mailAddress: "stub.com",
                zaisekiStatus: "iru"
            }
        }

        if (memberRecords == null) throw Error("メンバーがいません");

        const member = new Member({ ...memberRecords });
        return member;
    }
}