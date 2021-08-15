import { mockClear, mockReset } from "jest-mock-extended";
import { Member } from "../entity/Member"
import { MailAddress } from "../value/MailAddress";
import { ZaisekiStatus } from "../value/ZaisekiStatus";

describe("mailAddress", () => {
    const spy = jest.spyOn(MailAddress.prototype as any, "isDuplicateMailAddress");

    beforeEach(() => {
        // console.log(spy.mock.calls)
        spy.mockClear();
        jest.clearAllMocks();
    });

    // test('インスタンス作成失敗', async () => {

    //     spy.mockImplementation(() => false)

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
            zaisekiStatus: ZaisekiStatus.Zaiseki
        }
        const member = new Member(memerData);
        expect(member.name).toBe("higami");
        expect(member.zaisekiStatus.status).toBe(0);
    })
})


describe("zaiseki", () => {
    test('インスタンス作成確認', async () => {
        const zaiseki = new ZaisekiStatus(1)
        expect(zaiseki.status).toBe(ZaisekiStatus.Kyukai);
    })

    test('ステータス外１', async () => {
        expect(() => new ZaisekiStatus(5)).toThrow("ステータスは設定されている物を使用してください")
    })
    test('ステータス外２', async () => {
        expect(() => new ZaisekiStatus(-1)).toThrow("ステータスは設定されている物を使用してください")
    })
    // test('半角', async () => {
    //     expect(() => new ZaisekiStatus("２")).toThrow("ステータスは半角数字にしてください")
    // })
})