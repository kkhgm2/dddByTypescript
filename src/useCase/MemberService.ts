import { Member } from "../domain/entity/Member";
import { MemberRepository } from "../infra/repository/member/MemberRepository";

export class MemberService {
    memberRepository: MemberRepository;

    constructor(memberRepository: MemberRepository) {
        this.memberRepository = memberRepository;
    }

    public getUniqueMember(memberId: number): Promise<Member> {
        return this.memberRepository.getUniqueMember(memberId);
    }

    public async createMember(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const result = await Member.canCreate(member);
        if (result) {
            return this.memberRepository.createMember(Member.factory(member));
        }
    }

    public async updateMember(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const currentMember = await this.getUniqueMember(member.id);
        const result = await Member.canCreate(member);

        if (currentMember != null && result) {
            return this.memberRepository.updateMember(Member.factory(member));
        }
    }
}