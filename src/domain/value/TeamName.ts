
export class TeamName {
    public readonly name: number;

    public constructor(name: string) {
        const intName = this.isTeamNameToNumbered(name);

        if (!this.isLagerThan3(intName)) {
            throw new Error("チーム名を１−９９９までにしてください");
        }
        if (!this.isDuplicateTeamName(intName)) {
            throw new Error("チーム名が重複しています");
        }
        this.name = intName;
    }

    private isTeamNameToNumbered(name: string) {
        let intName = Number.parseInt(name);

        if (intName.toString() === name) {
            return intName;
        } else {
            throw new Error("チーム名は半角数字３桁までにしてください")
        }
    }

    private isLagerThan3(name: number): boolean {
        return 0 < name && name < 1000
    }

    private isDuplicateTeamName(name: number): boolean {
        // const mailAddressCount: number = await prisma.member.count({
        //     where: {
        //         mailAddress: mailAddress
        //     }
        // })
        const mailAddressCount = 0;
        return mailAddressCount == 0;
    }
}