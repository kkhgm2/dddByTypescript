import { Member } from "../domain/entity/Member";
import { MemberRepository } from "../infra/repository/member/MemberRepository";

export class MemberService {
    memberRepository: MemberRepository;

    constructor(memberRepository: MemberRepository) {
        this.memberRepository = memberRepository;
    }

    public getMembers(memberId: number): Promise<Member> {
        return this.memberRepository.getUniqueMember(memberId);
    }
}