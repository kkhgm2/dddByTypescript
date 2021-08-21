import prisma from "../../infra/client";

export class MailAddress {
    public readonly mailAddress: string;

    constructor(mailAddress: string) {
        this.mailAddress = mailAddress;
    }

    static async isDuplicated(mailAddress: string): Promise<boolean> {
        const mailAddressCount = await prisma.member.count({
            where: {
                mailAddress: mailAddress
            }
        })

        return mailAddressCount > 0;
    }
}