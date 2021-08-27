import { Member } from "../domain/entity/Member";
import { MailAddress } from "../domain/value/MailAddress";
import { MemberRepository } from "../infra/repository/member/MemberRepository";

export class MemberService {
    memberRepository: MemberRepository;

    constructor(memberRepository: MemberRepository) {
        this.memberRepository = memberRepository;
    }

    public getUniqueMember(memberId: number): Promise<Member> {
        return this.memberRepository.getUniqueMember(memberId);
    }

    public getAllMember() {
        return this.memberRepository.getAllMember();
    }

    public async createMember(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const result = await Member.canCreate(member);
        if (result) {
            return this.memberRepository.createMember(Member.factory(member));
        }
    }

    public async updateMember(newMemberInfo: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const currentMember = await this.getUniqueMember(newMemberInfo.id);
        const isDuplicate = await MailAddress.isDuplicatedExceptMyself(newMemberInfo.mailAddress, newMemberInfo.id)

        if (currentMember != null && !isDuplicate) {
            const updateResult = await this.memberRepository.updateMember(Member.factory(newMemberInfo));
            return updateResult;
        }
    }

    public async deleteMember(id: number) {
        const currentMember = await this.getUniqueMember(id);

        if (currentMember != null) {
            const updateResult = await this.memberRepository.deleteMember(id);
            return updateResult;
        }
    }
}