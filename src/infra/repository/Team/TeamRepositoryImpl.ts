import { MemberEntity } from "../../../domain/entity/MemberEntity";
import { TeamEntity } from "../../../domain/entity/TeamEntity";
import { TeamName } from "../../../domain/value/TeamName";
import prisma from "../../client";
import { TeamRepository } from "./TeamRepository";

export class TeamRepositoryImpl {
    // implements TeamRepository {

    async getAllTeam(): Promise<TeamEntity[]> {
        const team = await prisma.team.findMany({
            include: {
                members: {
                    include: {
                        member: true
                    }
                }
            }
        })

        return team.map(t => {
            return TeamEntity.mappingToEntity(t)
        })
    }

    async getManyTeam(nameValue: TeamName): Promise<TeamEntity[]> {
        const team = await prisma.team.findMany({
            where: {
                name: nameValue.name
            },
            include: {
                members: {
                    include: {
                        member: true
                    }
                }
            }
        })

        return team.map(t => {
            return TeamEntity.mappingToEntity(t)
        })
    }

    async getOneTeam(nameValue: TeamName): Promise<TeamEntity> {
        const team = await prisma.team.findMany({
            where: {
                name: nameValue.name,
            },
            include: {
                members: {
                    include: {
                        member: true
                    }
                }
            }
        })

        return TeamEntity.mappingToEntity(team[0])
    }

    async getOneTeamById(teamId: number): Promise<TeamEntity> {
        const team = await prisma.team.findMany({
            where: {
                id: teamId
            },
            include: {
                members: true
            }
        })

        return TeamEntity.mappingToEntity(team[0])
    }

    async getMinimumamTeam() {
        const memberCount = await prisma.teamMembers.groupBy({
            by: ['teamId'],
            _count: {
                teamId: true
            },
            orderBy: {
                _count: {
                    teamId: "asc"
                }
            },
        })

        return memberCount[0];
    }

    async getSameTeamCount(nameValue: TeamName) {
        return prisma.team.count({
            where: {
                name: nameValue.name
            }
        })
    }

    async getBelongMemberCount(teamId: number) {
        const memberCount = await prisma.teamMembers.groupBy({
            where: {
                teamId: teamId
            },
            by: ['teamId'],
            _count: {
                teamId: true
            },
            orderBy: {
                _count: {
                    teamId: "desc"
                }
            },
        })

        return memberCount[0]._count.teamId;
    }

    async createOneTeam(name: TeamName, members: MemberEntity[]) {
        console.log(members)
        const membersId = members.map(m => ({ memberId: m.id }))
        const newTeam = await prisma.team.create({
            data: {
                name: name.name,
                members: {
                    create:
                        membersId
                }
            }
        })

        return TeamEntity.factory(newTeam['id'], name, members);
    }

    async addMember(teamId: number, members: MemberEntity[]): Promise<boolean> {
        const teamInfo = members.map(m => {
            return { teamId: teamId, memberId: m.id }
        })

        console.log(teamId)
        console.log(members)
        console.log(teamInfo)
        const result = await prisma.teamMembers.createMany({
            data: teamInfo
        })

        return result.count > 0;
    }

    async deleteMember(teamId: number, members: MemberEntity[]): Promise<boolean> {
        const membersId: number[] = members.map(m => m.id)
        const result = await prisma.teamMembers.deleteMany({
            where: {
                teamId: teamId,
                memberId: { in: membersId }
            }
        })

        return result.count > 0;
    }
}