import { MailAddress } from "../value/MailAddress";
import { ValueFactory } from "../value/ValueFactory";
import { Member } from "./Member";

export class EntityFactory {

    static memberCreate(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const { id, name, mailAddress, zaisekiStatus } = member;
        return ValueFactory.mailAddressFactory(mailAddress).then((mail) => {
            return new Member(id, name, mail, zaisekiStatus)
        }).catch((value) => {
            throw value;
        })
    }
    static memberFind(member: { id: number; name: string, mailAddress: string, zaisekiStatus: number }) {
        const { id, name, mailAddress, zaisekiStatus } = member;
        return new Member(id, name, new MailAddress(mailAddress), zaisekiStatus)
    }
}