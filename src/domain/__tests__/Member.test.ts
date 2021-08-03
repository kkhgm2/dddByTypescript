import { Member } from "../entity/Member"
import { MailAddress } from "../value/MailAddress";

describe("mailAddress", () => {
    // モック化する！！
    // test('インスタンス作成失敗', async () => {
    //     expect(() => new MailAddress("aaaa.com"))
    //         .toThrow("メールアドレスが重複しています");
    // })

    test('インスタンス作成成功', async () => {
        const mail = new MailAddress("aaaa.com");
        expect(mail.mailAddress).toBe("aaaa.com")
    })
})

describe("member", () => {
    test('インスタンス作成確認', async () => {
        const memerData = {
            id: 1,
            name: "higami",
            mailAddress: "aaa.com",
            zaisekiStatus: "iru"
        }
        const member = new Member(memerData);
        expect(member.name).toBe(memerData.name);
    })
})