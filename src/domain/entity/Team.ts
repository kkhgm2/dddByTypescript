import { Member as prismaMember } from "@prisma/client";
import { TeamName } from "../value/TeamName";
import { Member } from "./Member";

export class Team {
    public readonly id: number;
    public readonly teamName: TeamName;
    public readonly members: Member[];

    public constructor(id: number, teamName: string, members: Member[]) {
        // const { id, teamName, members } = props
        this.id = id;
        this.teamName = new TeamName(teamName);
        this.members = members;
    }


    // static factory(id: number, teamName: string, members: Member[]) {
    //     // const { id, teamName, members } = teamInfo;
    //     return new Team(id, teamName, members)
    // }

    static factory(allTeamInfo: { teamId: number, memberId: number, team: Team, member: prismaMember }[]) {
        let members: Member[] = []
        for (let i = 0; i < allTeamInfo.length; i++) {
            var oldTeamId;
            let currentMem = allTeamInfo[i].member
            let currentTeam = allTeamInfo[i];
            let currentTeamId = currentTeam.teamId;

            if (i == 0) {
                members.push(Member.factory(currentMem))
                oldTeamId = currentTeamId;
                continue;
            } else if (oldTeamId == currentTeamId) {
                members.push(Member.factory(currentMem))

            } else {
                let t = new Team(currentTeamId, currentTeam.team.name, members)

                members = []
                members.push(Member.factory(currentMem))
                oldTeamId = currentTeamId;
            }

            if (allTeamInfo.length == i + 1) {
                let t = new Team(currentTeamId, currentTeam.team.name, members)
            }
        }
    }
}