import { Member } from "../../../domain/entity/Member";

export interface MemberRepository {
    getUniqueMember(memberId: number);
}