import express, { Request, Response } from 'express'
import { MemberRepository } from '../infra/repository/member/MemberRepository';
import { MemberRepositoryImpl } from '../infra/repository/member/MemberRepositoryImpl';

import { MemberService } from '../useCase/MemberService';

const app: express.Express = express()

app.route('/member')
    .get((req: Request, res: Response) => {
        const repo: MemberRepository = new MemberRepositoryImpl();
        const service: MemberService = new MemberService(repo);

        getAllMember(service, res);
    })


app.route('/member/:id')
    .get((req: Request, res: Response) => {
        const repo: MemberRepository = new MemberRepositoryImpl();
        const service: MemberService = new MemberService(repo);
        const userId = Number(req.params.id)
        const member = service.getUniqueMember(userId)
        member.then((m) => {
            res.json(m)
        })
    })


app.listen(3000, () => {
    console.log('ポート3000番で起動しました。')
})


function getAllMember(service: MemberService, res: express.Response) {
    const member = service.getAllMember();
    member.then((m) => {
        res.json(m)
    })
}