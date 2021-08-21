import { throws } from "assert";
import { MailAddress } from "../value/MailAddress";
import { ZaisekiStatus } from "../value/ZaisekiStatus";

export class Member {
    public readonly id: number;
    public readonly name: string;
    public readonly mailAddress: MailAddress | undefined;
    public readonly zaisekiStatus: ZaisekiStatus;

    public constructor(id: number, name: string, mailAddress: MailAddress, zaisekiStatus: number) {
        this.id = id;
        this.name = name;
        this.mailAddress = mailAddress;
        this.zaisekiStatus = new ZaisekiStatus(zaisekiStatus);
    }
}