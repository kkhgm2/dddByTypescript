import { MailAddress } from "../value/MailAddress";

export class Member {
    public readonly id: number;
    public readonly name: string;
    public readonly mailAddress: MailAddress;
    public readonly zaisekiStatus: string;

    public constructor(member: { id: number; name: string, mailAddress: string, zaisekiStatus: string }) {
        const { id, name, mailAddress, zaisekiStatus } = member;
        this.id = id;
        this.name = name;
        this.mailAddress = new MailAddress(mailAddress);
        this.zaisekiStatus = zaisekiStatus;
    }
}