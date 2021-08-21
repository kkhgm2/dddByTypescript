import { mockClear, mockReset } from "jest-mock-extended";
import { MemberRepositoryImpl } from "../../infra/repository/member/MemberRepositoryImpl";
import { Member } from "../entity/Member"
import { MailAddress } from "../value/MailAddress";
import { ZaisekiStatus } from "../value/ZaisekiStatus";
import prisma from "../../infra/client";
import { prismaMock } from "../../infra/singleton";
import { EntityFactory } from "../entity/EntityFactory";

describe("member", () => {
    test('インスタンス作成確認', async () => {
        const memerData = {
            id: 1,
            name: "higami",
            mailAddress: "aaa.com",
            zaisekiStatus: ZaisekiStatus.Zaiseki
        }
        const member = EntityFactory.memberCreate(memerData);
        expect((await member).name).toBe("higami");
        expect((await member).zaisekiStatus.status).toBe(0);
    })

    test('インスタンス失敗確認', async () => {
        const memerData = {
            id: 1,
            name: "higami",
            mailAddress: "aaa.com",
            zaisekiStatus: ZaisekiStatus.Zaiseki
        }

        prismaMock.member.count.mockResolvedValue(1);
        expect(EntityFactory.memberCreate(memerData))
            .rejects.toEqual(new Error("メールアドレスが重複しています"));
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