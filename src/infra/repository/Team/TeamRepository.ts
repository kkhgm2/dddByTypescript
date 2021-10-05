import { MemberEntity } from "../../../domain/entity/MemberEntity";
import { TeamEntity } from "../../../domain/entity/TeamEntity";
import { TeamName } from "../../../domain/value/TeamName";

export interface TeamRepository {
    getAllTeam(): Promise<TeamEntity[]>
    getManyTeam(nameValue: TeamName): Promise<TeamEntity[]>
    getOneTeam(nameValue: TeamName): Promise<TeamEntity>

    createOneTeam(name: TeamName, members: MemberEntity[]): Promise<TeamEntity>

    addMember(teamId: number, members: MemberEntity[]): Promise<boolean>
    deleteMember(teamId: number, members: MemberEntity[]): Promise<boolean>;
}