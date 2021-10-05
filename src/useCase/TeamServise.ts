import { MemberEntity } from "../domain/entity/MemberEntity";
import { TeamEntity } from "../domain/entity/TeamEntity";
import { TeamName } from "../domain/value/TeamName";
import { MemberRepository } from "../infra/repository/member/MemberRepository";
import { TeamRepository } from "../infra/repository/Team/TeamRepository";
import { TeamRepositoryImpl } from "../infra/repository/Team/TeamRepositoryImpl";

// ・チームの検索
// ・チームの追加
// （チームが存在すれば、メンバーが存在しなければならない）
// （メンバーが存在すれば、チームに所属する？）
//     チームを新規作成
//         チーム名が重複していないか？
//         チームを新規作成

//  ・チームにメンバーを追加（どういった形でチーム名、メンバーを指定？）
//         追加メンバーが他のチームに所属していないか確認
//         チームにメンバーを追加（中間テーブルに登録）

// ・チームからメンバーを削除（どういった形でメンバーを指定？）
//     メンバーが存在するか確認
//     存在すれば、中間テーブルからメンバーを削除（メンバーの削除は行わない）
//     チームのメンバー数を把握
//     ２人以下なら、残っているメンバーの振り分け
//         最小のチームを探す
//         メンバーをそこへ追加


export class TeamService {
    teamRepository: TeamRepositoryImpl;
    memberRepository: MemberRepository;

    constructor(teamRepository: TeamRepositoryImpl, memberRepository: MemberRepository) {
        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
    }

    public async getOneTeam(teamNameValue: TeamName): Promise<TeamEntity> {
        const test = await this.teamRepository.getOneTeam(teamNameValue);
        return test;
    }

    public getManyTeam(teamNameValue: TeamName) {
        return this.teamRepository.getManyTeam(teamNameValue);
    }

    public getAllTeam() {
        return this.teamRepository.getAllTeam();
    }

    public async createTeam(teamNameValue: TeamName, members: MemberEntity[]) {

        // // メンバーのチェック
        if (members.length < 3) {
            throw new Error("入力されたメンバー数が足りていません。３人入力してください。");
        }
        this.checkInputedMember(members);

        // 新規チームの作成
        return await this.registTeam(teamNameValue, members);

        // チームへメンバーの追加
        // return await this.addMember(createdTeam.id, members);
    }

    private async checkInputedMember(members: MemberEntity[]) {
        const membersId = members.map(m => m.id);
        const exsitMember = await this.memberRepository.getMembers(membersId);
        if (exsitMember == null) {
            throw new Error("入力されたメンバーが存在しません");
        }
    }

    private async registTeam(teamNameValue: TeamName, members: MemberEntity[]): Promise<TeamEntity> {

        const sameTeamName = await this.teamRepository.getSameTeamCount(teamNameValue)
        if (sameTeamName != 0) {
            throw new Error("チーム名が重複しています");
        }

        return await this.teamRepository.createOneTeam(teamNameValue, members);
    }

    // private async addMember(teamId: number, members: MemberEntity[]) {
    //     const addMemberResult = await this.teamRepository.addMember(teamId, members)
    //     if (addMemberResult) {
    //         return this.teamRepository.getOneTeamById(teamId)
    //     }
    //     throw new Error('追加に失敗しました。')
    // }

    public async deleteMember(teamNameValue: TeamName, members: MemberEntity[]) {
        const teamResult = await this.getOneTeam(teamNameValue);
        teamResult.members.map(m => {
            if (null == m.member || 0 == m.member.length) {
                throw new Error('まだ所属メンバーがいます')
            }
        })

        const memberDeleted = await this.teamRepository.deleteMember(teamResult.id, members);
        if (!memberDeleted) {
            throw new Error('削除に失敗しました')
        }

        // const belongMemberCount = await this.teamRepository.getBelongMemberCount(teamResult.id);
        // if (3 > belongMemberCount) {
        //     this.transferMemberToOtherTeam(members);
        // }

    }

    async transferMemberToOtherTeam(members: MemberEntity[]) {
        const minTeam = await this.teamRepository.getMinimumamTeam();
        this.teamRepository.addMember(minTeam.teamId, members);
    }
}