
export class TeamName {
    public readonly name: number;

    public constructor(name: number) {
        if (!this.isLagerThan3(name)) {
            throw new Error("チーム名を１−９９９までにしてください");
        }
        this.name = name;
    }

    private isLagerThan3(name: number): boolean {
        return 0 < name && name < 1000
    }
}