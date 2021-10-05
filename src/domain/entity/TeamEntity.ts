import { Member as prismaMember, Team } from "@prisma/client";
import { type } from "os";
import { TeamName } from "../value/TeamName";
import { MemberEntity } from "./MemberEntity";
import { TeamsEntity } from "./TeamsEntity";

type memberType = { id: number, name: string, mailAddress: string, zaisekiStatus: number }

type teamType = {
    teamId: number,
    memberId: number,
    joinedAt: Date,
    member: memberType
}

export class TeamEntity {
    public readonly id: number;
    public readonly teamName: TeamName;
    public readonly members: MemberEntity[];

    private constructor(id: number, name: TeamName, members: MemberEntity[]) {
        // console.log(`${id} : ${teamName}: ${members[0]}`)
        this.id = id;
        this.teamName = name;
        this.members = members;
    }
    static mappingToEntity(team: any) {
        console.log(team)
        let mEntity: MemberEntity[] = team.members.map((m:
            teamType) => {
            return MemberEntity.factory(m.member);
        })

        const teamName = new TeamName(team.name);

        // console.log(team)
        // console.log(mEntity)

        return new TeamEntity(team.id, teamName, mEntity)
    }


    static factory(id: number, name: TeamName, members: MemberEntity[]): TeamEntity {
        return new TeamEntity(id, name, members)
    }

}