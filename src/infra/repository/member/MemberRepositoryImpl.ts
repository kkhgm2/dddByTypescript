import { EntityFactory } from "../../../domain/entity/EntityFactory";
import { MemberEntity } from "../../../domain/entity/MemberEntity";
import prisma from "../../client";
import { MemberRepository } from "./MemberRepository";

export class MemberRepositoryImpl implements MemberRepository {
    public async getUniqueMember(memberId: number): Promise<MemberEntity> {
        const memberRecords = await prisma.member.findUnique({
            where: {
                id: memberId
            }
        });
        if (memberRecords == null) throw Error("メンバーがいません");

        return MemberEntity.factory({ ...memberRecords });
    }

    public async getAllMember(): Promise<MemberEntity[]> {
        const members = await prisma.member.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        return members.map((mem) => MemberEntity.factory({ ...mem }))
    }

    public async getMembers(id: number[]): Promise<MemberEntity[]> {
        const members = await prisma.member.findMany({
            where: {
                id: { in: id }
            },
            orderBy: {
                id: 'asc'
            }
        });
        console.log(members)


        return members.map((mem) => MemberEntity.factory({ ...mem }))
    }

    public async createMember(member: MemberEntity): Promise<MemberEntity> {
        const { name, mailAddress, zaisekiStatus } = member;
        const result = await prisma.member.create({
            data: {
                name: name,
                mailAddress: mailAddress.mailAddress,
                zaisekiStatus: zaisekiStatus.status
            }
        });

        return MemberEntity.factory({ ...result });
    }

    public async updateMember(member: MemberEntity): Promise<MemberEntity> {
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

        return MemberEntity.factory({ ...result });
    }

    public async deleteMember(memberId: number): Promise<MemberEntity> {
        const result = await prisma.member.delete({
            where: {
                id: memberId
            }
        });

        return MemberEntity.factory({ ...result });
    }
}