import prisma from "../../client";
import { Member } from "../../domain/entity/Member";
import { MemberRepository } from "./MemberRepository";

export class MemberRepositoryImpl implements MemberRepository {
    public async getUniqueMember(memberId: number): Promise<Member> {
        const memberRecords = await prisma.member.findUnique({
            where: {
                id: memberId
            }
        });
        if (memberRecords == null) throw Error("メンバーがいません");

        const member = new Member({ ...memberRecords });
        return member;
    }
}