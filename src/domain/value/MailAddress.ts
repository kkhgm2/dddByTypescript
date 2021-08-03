import prisma from "../../client";

export class MailAddress {
    public readonly mailAddress: string;

    public constructor(mailAddress: string) {
        if (this.isDuplicateMailAddress(mailAddress)) {
            this.mailAddress = mailAddress;
        } else {
            throw new Error("メールアドレスが重複しています");
        }
    }

    private isDuplicateMailAddress(mailAddress: string): boolean {
        // const mailAddressCount: number = await prisma.member.count({
        //     where: {
        //         mailAddress: mailAddress
        //     }
        // })
        const mailAddressCount = 0;
        return mailAddressCount == 0;
    }
}