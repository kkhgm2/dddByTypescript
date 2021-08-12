import { MemberRepository } from "../infra/repository/member/MemberRepository";

export class MemberService {
    memberRepository: MemberRepository;

    constructor(memberRepository: MemberRepository) {
        this.memberRepository = memberRepository;
    }

    public getMembers(memberId: number) {
        return this.memberRepository.getUniqueMember(memberId);
    }
}