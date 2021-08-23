import { Member } from "../../../domain/entity/Member";
import { ZaisekiStatus } from "../../../domain/value/ZaisekiStatus";
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
                zaisekiStatus: ZaisekiStatus.Zaiseki
            }
        }

        if (memberRecords == null) throw Error("メンバーがいません");

        return Member.factory({ ...memberRecords });
    }
}