import express, { Request, Response } from 'express'
import { MemberRepository } from '../infra/repository/member/MemberRepository';
import { MemberRepositoryImpl } from '../infra/repository/member/MemberRepositoryImpl';

import { MemberService } from '../useCase/MemberService';

const app: express.Express = express()
const repo: MemberRepository = new MemberRepositoryImpl();
const service: MemberService = new MemberService(repo);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.route('/member')
    .get((req: Request, res: Response) => {
        // const result = service.getAllMember();
        getAllMember(service, res);

    })
    .post(async (req: Request, res: Response) => {
        try {
            const result = await service.createMember(req.body);
            res.json(result)
        } catch (error) {
            res.json(error.message)
        }
    })


app.route('/member/:id')
    .get(async (req: Request, res: Response) => {
        const repo: MemberRepository = new MemberRepositoryImpl();
        const service: MemberService = new MemberService(repo);
        const userId = Number(req.params.id)

        try {
            const member = await service.getUniqueMember(userId)
            res.json(member)
        } catch (error) {
            res.json(error.message)
        }

    }).put(async (req: Request, res: Response) => {
        req.body.id = Number(req.params.id)
        try {
            const result = await service.updateMember(req.body);
            res.json(result)
        } catch (error) {
            res.json(error.message)
        }

    }).delete(async (req: Request, res: Response) => {
        const userId = Number(req.params.id)
        try {
            const result = await service.deleteMember(userId);
            res.json(result)
        } catch (error) {
            res.json(error.message)
        }
    })


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