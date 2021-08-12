import express from 'express'
import { User } from '../../User';
import { MemberRepository } from '../infra/repository/member/MemberRepository';
import { MemberRepositoryImpl } from '../infra/repository/member/MemberRepositoryImpl';

import { MemberService } from '../useCase/MemberService';
const app: express.Express = express()
app.get("/", (req: express.Request, res: express.Response) => {
    // const repo: MemberRepository = new MemberRepositoryImplStub();
    const repo: MemberRepository = new MemberRepositoryImpl();

    const service: MemberService = new MemberService(repo);
    const member = service.getMembers(1);

    member.then((m) => {
        res.json(m)
    })
})
app.listen(3000, () => {
    console.log('ポート3000番で起動しました。')
})