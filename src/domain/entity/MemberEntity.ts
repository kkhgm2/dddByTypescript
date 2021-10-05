import { MailAddress } from "../value/MailAddress";
import { ZaisekiStatus } from "../value/ZaisekiStatus";

export class MemberEntity {
    member(member: any): MemberEntity {
        throw new Error("Method not implemented.");
    }
    public readonly id: number;
    public readonly name: string;
    public readonly mailAddress: MailAddress;
    public readonly zaisekiStatus: ZaisekiStatus;

    private constructor(id: number, name: string, mailAddress: string, zaisekiStatus: number) {
        this.id = id;
        this.name = name;
        this.mailAddress = MailAddress.factory(mailAddress);
        this.zaisekiStatus = new ZaisekiStatus(zaisekiStatus);
    }

    static factory(member: { id: number, name: string, mailAddress: string, zaisekiStatus: number }) {
        const { id, name, mailAddress, zaisekiStatus } = member;
        console.log(id)
        return new MemberEntity(id, name, mailAddress, zaisekiStatus)
    }

    static async canCreate(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }): Promise<boolean> {
        const isDuplicate = await MailAddress.isDuplicated(member.mailAddress)

        return !isDuplicate;
    }
}