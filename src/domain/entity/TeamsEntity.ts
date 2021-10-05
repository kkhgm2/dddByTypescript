import { Member as prismaMember, Team } from "@prisma/client";
import { Member } from "./Member";
import { TeamEntity } from "./TeamEntity";

export class TeamsEntity {
    readonly teams: TeamEntity[] = [];

    private constructor(team: TeamEntity) {
        this.teams.push(team);
    }


    // static factory(id: number, teamName: string, members: Member[]) {
    //     // const { id, teamName, members } = teamInfo;
    //     return new Team(id, teamName, members)
    // }

    static factory(allTeamInfo: { teamId: number, memberId: number, team: Team, member: prismaMember }[]) {
        let members: Member[] = []
        for (let i = 0; i < allTeamInfo.length; i++) {
            var oldTeamId = 0;
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
                let t = new TeamEntity(oldTeamId, currentTeam.team.name, members)
                // this.teams.push(t)
                new TeamsEntity(t);

                members = []
                members.push(Member.factory(currentMem))
                oldTeamId = currentTeamId;
            }

            if (allTeamInfo.length == i + 1) {
                let t = new TeamEntity(currentTeamId, currentTeam.team.name, members)
                // teams.push(t)
                new TeamsEntity(t);

            }
        }
    }
}