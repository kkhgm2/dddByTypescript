import prisma from "../../infra/client";

export class MailAddress {
    public readonly mailAddress: string;

    private constructor(mailAddress: string) {
        this.mailAddress = mailAddress;
    }

    static async isDuplicated(mailAddress: string): Promise<boolean> {
        const mailAddressCount = await prisma.member.count({
            where: {
                mailAddress: mailAddress
            }
        })
        console.log(`${mailAddress} : ${mailAddressCount}`)

        if (mailAddressCount > 0) {
            throw new Error('メールアドレスが重複しています');
        } else {
            return false;
        }
    }

    static factory(mailAddress: string): MailAddress {
        return new MailAddress(mailAddress)
    }
}