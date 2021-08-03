import { Member } from "../entity/Member"

describe("", () => {

    test('create new user', async () => {
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