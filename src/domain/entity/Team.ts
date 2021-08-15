import { TeamName } from "../value/TeamName";
import { Member } from "./Member";

export class Team {
    public readonly id: number;
    public readonly teamName: TeamName;
    public readonly members: Member[];

    public constructor(memberInfo: { id: number; teamName: string, members: Member[] }) {
        const { id, teamName, members } = memberInfo;
        this.id = id;
        this.teamName = new TeamName(teamName);
        this.members = members;
    }
}