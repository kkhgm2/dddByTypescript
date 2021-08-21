import { EntityFactory } from "../../../domain/entity/EntityFactory";
import { Member } from "../../../domain/entity/Member";
import prisma from "../../client";
import { MemberRepository } from "./MemberRepository";

export class MemberRepositoryImpl implements MemberRepository {
    public async getUniqueMember(memberId: number): Promise<Member> {
        const memberRecords = await prisma.member.findUnique({
            where: {
                id: memberId
            }
        });
        if (memberRecords == null) throw Error("メンバーがいません");

        const member = EntityFactory.memberFind({ ...memberRecords });
        return member;
    }

    public async getAllMember() {
        const users = await prisma.member.findMany();
        return users;
    }

    // public async getMembers(memberId: number): Promise<Member[]> {
    //     const memberRecords = await prisma.member.findMany({
    //         where: {
    //             id: memberId
    //         }
    //     });
    //     if (memberRecords == null) throw Error("メンバーがいません");

    //     const members = memberRecords.map((member) => {
    //         new Member(member)
    //     })
    //     return members;
    // }
}