import express, { Request, Response } from 'express'
import { MemberEntity } from '../domain/entity/MemberEntity';
import { Team } from '../domain/entity/Team';
import { TeamName } from '../domain/value/TeamName';
import { MemberRepository } from '../infra/repository/member/MemberRepository';
import { MemberRepositoryImpl } from '../infra/repository/member/MemberRepositoryImpl';
import { TeamRepository } from '../infra/repository/Team/TeamRepository';
import { TeamRepositoryImpl } from '../infra/repository/Team/TeamRepositoryImpl';

import { MemberService } from '../useCase/MemberService';
import { TeamService } from '../useCase/TeamServise';

type memberData = { id: number, name: string, mailAddress: string, zaisekiStatus: number }

const app: express.Express = express()
const teamRepo: TeamRepositoryImpl = new TeamRepositoryImpl();
const memberRepo: MemberRepository = new MemberRepositoryImpl();
const teamService: TeamService = new TeamService(teamRepo, memberRepo);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.route('/team')
    .get(async (req: Request, res: Response) => {

        try {
            const team = await teamService.getAllTeam();
            console.log('teeem')
            console.log(team)

            res.json(team)
        } catch (error) {
            res.json(error)
        }
    })

app.route('/team/:name')
    .get(async (req: Request, res: Response) => {
        const teamName = Number(req.params.name)
        console.log(teamName)

        try {
            const team = await teamService.getOneTeam(new TeamName(teamName));
            res.json(team)
        } catch (error) {
            res.json(error)
        }
    }).post(async (req: Request, res: Response) => {
        const teamName = Number(req.params.name)
        const memberData: memberData[] = JSON.parse(req.body.addMember)
        console.log(memberData)

        try {
            const member = memberData.map((m) => {
                return MemberEntity.factory(m)
            })
            const result = await teamService.createTeam(new TeamName(teamName), member);
            // res.json(result)
            res.json(result)
        } catch (error) {
            if (error instanceof Error) {
                res.json(error.message)
            }
        }
    });

app.listen(3000, () => {
    console.log('ポート3000番で起動しました。')
})

function getAllMember(service: MemberService, res: express.Response) {
    const member = service.getAllMember();
    member.then((m) => {
        res.json(m)
    }).catch(error =>
        res.json(error.message)
    )
}