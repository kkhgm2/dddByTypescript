import { Member } from "../entity/Member";
import { Team } from "../entity/Team";
import { TeamName } from "../value/TeamName";
import { ZaisekiStatus } from "../value/ZaisekiStatus";


describe("teamName", () => {

    describe("インスタンス作成確認", () => {
        test("名前が０以上の時", async () => {
            const teamName = new TeamName('1');
            expect(teamName.name).toBe(1);
        })
        test("名前が１０００以下の時", async () => {
            const teamName = new TeamName('999');
            expect(teamName.name).toBe(999);
        })
        test("それ以外", async () => {
            const teamName = new TeamName('100');
            expect(teamName.name).toBe(100);
        })

    })

    describe("インスタンス作成失敗", () => {
        test("文字列が含まれている", async () => {
            expect(() => new TeamName('aaa')).toThrow('チーム名は半角数字３桁までにしてください');
        })
        test("半角でない", async () => {
            expect(() => new TeamName('１２３')).toThrow('チーム名は半角数字３桁までにしてください');
        })
        test("数字以外の文字列が含まれている時", async () => {
            expect(() => new TeamName('1@@')).toThrow('チーム名は半角数字３桁までにしてください');
        })
        test("名前が１以下の時", async () => {
            expect(() => new TeamName('0')).toThrow('チーム名を１−９９９までにしてください');
        })
        test("名前が９９９以上の時", async () => {
            expect(() => new TeamName('1000')).toThrow('チーム名を１−９９９までにしてください');
        })
        // モックが消えない！！
        // test('チーム名の重複', async () => {
        //     const spy = jest.spyOn(TeamName.prototype as any, "isDuplicateTeamName");
        //     spy.mockImplementation(() => false)
        //     expect(() => new TeamName("123"))
        //         .toThrow("チーム名が重複しています");
        //     spy.mockClear();
        // })
    })
})

describe("team", () => {

    const m1 = {
        id: 1,
        name: "higami",
        mailAddress: "aaa.com",
        zaisekiStatus: ZaisekiStatus.Kyukai
    }

    const m2 = {
        id: 2,
        name: "ishihara",
        mailAddress: "bbb.com",
        zaisekiStatus: ZaisekiStatus.Zaiseki
    }

    const members = [new Member(m1), new Member(m2)];

    let teamData = {
        id: 1,
        teamName: "1",
        members: members
    }

    describe("インスタンス作成成功", () => {
        test("", () => {
            const team = new Team(teamData);
            expect(team.id).toBe(1)
            expect(team.teamName.name).toBe(1)
            expect(team.members[0].name).toBe("higami")
            expect(team.members[1].name).toBe("ishihara")
        })
    })

    describe("インスタンス作成失敗", () => {
        test("チーム名が０の時", () => {
            teamData.teamName = "0"
            expect(() => new Team(teamData)).toThrow('チーム名を１−９９９までにしてください');
        })
    })
    test("チーム名が１０００の時", () => {
        teamData.teamName = "1000"
        expect(() => new Team(teamData)).toThrow('チーム名を１−９９９までにしてください');
    })
    test("チーム名が文字列の時", () => {
        teamData.teamName = "１２３"
        expect(() => new Team(teamData)).toThrow('チーム名は半角数字３桁までにしてください');
    })
    test("チーム名が空の時", () => {
        teamData.teamName = ""
        expect(() => new Team(teamData)).toThrow('チーム名は半角数字３桁までにしてください');
    })

})