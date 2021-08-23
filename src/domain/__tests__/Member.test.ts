import { mockClear, mockReset } from "jest-mock-extended";
import { MemberRepositoryImpl } from "../../infra/repository/member/MemberRepositoryImpl";
import { Member } from "../entity/Member"
import { MailAddress } from "../value/MailAddress";
import { ZaisekiStatus } from "../value/ZaisekiStatus";
import prisma from "../../infra/client";
import { prismaMock } from "../../infra/singleton";
import { EntityFactory } from "../entity/EntityFactory";

describe("member", () => {
    const memerData = {
        id: 1,
        name: "higami",
        mailAddress: "aaa.com",
        zaisekiStatus: ZaisekiStatus.Zaiseki
    }

    test('インスタンス作成確認', async () => {
        prismaMock.member.count.mockResolvedValue(0);
        // MailAddress.isDuplicated("aaa.com");

        const member = Member.factory(memerData);
        expect((await member).name).toBe("higami");
        expect((await member).zaisekiStatus.status).toBe(0);

        // expect(async () => {
        //     const result = Member.canCreate(memerData);
        //     if (await result) {
        //         return Member.factory(memerData);
        //     }
        // }).resolves.toEqual(new Error("メールアドレスが重複しています"));
    })

    test('インスタンス失敗確認', async () => {
        prismaMock.member.count.mockResolvedValue(1);
        expect(async () => {
            const result = Member.canCreate(memerData);
            if (await result) {
                return Member.factory(memerData);
            }
        }).rejects.toEqual(new Error("メールアドレスが重複しています"));
    })
})


describe("zaiseki", () => {
    test('インスタンス作成確認', async () => {
        const zaiseki = new ZaisekiStatus(1)
        expect(zaiseki.status).toBe(ZaisekiStatus.Kyukai);
    })

    test('ステータス外１', async () => {
        expect(() => new ZaisekiStatus(3)).toThrow("ステータスは設定されている物を使用してください")
    })
    test('ステータス外２', async () => {
        expect(() => new ZaisekiStatus(-1)).toThrow("ステータスは設定されている物を使用してください")
    })
    test('ステータス外3', async () => {
        const status = new ZaisekiStatus(0)
        expect(status.status).toBe(ZaisekiStatus.Zaiseki)
    })
    test('ステータス外4', async () => {
        const status = new ZaisekiStatus(1)
        expect(status.status).toBe(ZaisekiStatus.Kyukai)
    })
    test('ステータス外5', async () => {
        const status = new ZaisekiStatus(2)
        expect(status.status).toBe(ZaisekiStatus.Taikai)
    })
    // test('半角', async () => {
    //     expect(() => new ZaisekiStatus("２")).toThrow("ステータスは半角数字にしてください")
    // })
})