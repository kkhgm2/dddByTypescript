import { MailAddress } from "../value/MailAddress";
import { prismaMock } from "../../infra/singleton";
import prisma from "../../infra/client";
import { ValueFactory } from "../value/ValueFactory";

describe("mailAddress", () => {
    test('インスタンス作成成功', async () => {
        const count = prisma.member.count({
            where: {
                mailAddress: "aaaa.com"
            }
        });

        prismaMock.member.count.mockResolvedValue(0);
        const target = MailAddress.isDuplicated("aaaa.com");
        expect(target)
            .resolves.toEqual(false)
    })

    test('インスタンス作成失敗', async () => {
        prismaMock.member.count.mockResolvedValue(1);
        expect(() => MailAddress.isDuplicated("aaaa.com"))
            .rejects.toEqual(new Error("メールアドレスが重複しています"));
    })
})