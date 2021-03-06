import { Member } from "../../../domain/entity/Member";

export interface MemberRepository {
    getUniqueMember(memberId: number): Promise<Member>;

    createMember(member: Member): Promise<Member>;

    updateMember(member: Member): Promise<Member>

    getAllMember(): Promise<Member[]>;

    deleteMember(memberId: number): Promise<Member>;

    getMembers(id: number[]): Promise<Member[]>

}