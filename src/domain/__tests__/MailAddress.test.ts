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
        const target = ValueFactory.mailAddressFactory("aaaa.com");
        expect(target)
            .resolves.toEqual(new MailAddress("aaaa.com"))
    })

    test('インスタンス作成失敗', async () => {
        prismaMock.member.count.mockResolvedValue(1);
        expect(() => ValueFactory.mailAddressFactory("aaaa.com"))
            .rejects.toEqual(new Error("メールアドレスが重複しています"));
    })
})