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

        return Member.factory({ ...memberRecords });
    }

    public async getAllMember() {
        const users = await prisma.member.findMany();
        return users;
    }

    public async createMember(member: Member): Promise<Member> {
        console.log(member)

        const { name, mailAddress, zaisekiStatus } = member;
        const result = await prisma.member.create({
            data: {
                name: name,
                mailAddress: mailAddress.mailAddress,
                zaisekiStatus: zaisekiStatus.status
            }
        });

        return Member.factory({ ...result });
    }

    public async updateMember(member: Member): Promise<Member> {
        const result = await prisma.member.update({
            where: {
                id: member.id
            },
            data: {
                name: member.name,
                mailAddress: member.mailAddress.mailAddress,
                zaisekiStatus: member.zaisekiStatus.status
            }
        });

        return Member.factory({ ...result });
    }
}