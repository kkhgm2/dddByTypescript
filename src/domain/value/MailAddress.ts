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

        if (mailAddressCount > 0) {
            throw new Error('メールアドレスが重複しています');
        } else {
            return false;
        }
    }

    // 自身以外にメールアドレスがないかを確認　更新時に使用想定
    static async isDuplicatedExceptMyself(mailAddress: string, userId: number): Promise<boolean> {
        const mailAddressCount = await prisma.member.count({
            where: {
                mailAddress: mailAddress
                , id: {
                    not: userId
                }
            }
        })

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