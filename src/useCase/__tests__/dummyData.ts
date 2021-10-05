
const memberInfo1 = { id: 1, name: 'higami', mailAddress: 'aaa', zaisekiStatus: 0 };
const memberInfo2 = { id: 2, name: 'ishihara', mailAddress: 'aaa', zaisekiStatus: 0 };
const teamMembers1 =
{
    teamId: 1,
    memberId: 1,
    joinedAt: "2021-09-22T08:46:05.816Z",
    member: memberInfo1
}

const teamMembers2 =
{
    teamId: 1,
    memberId: 2,
    joinedAt: "2021-09-22T08:46:05.816Z",
    member: memberInfo2
}

const allTeam = [
    { id: 3, name: 10, members: [teamMembers1] },
    { id: 4, name: 100, members: [teamMembers1] },
    { id: 5, name: 200, members: [teamMembers1] },
    { id: 7, name: 300, members: [teamMembers1, teamMembers2] }
]

const oneTeam = [
    { id: 3, name: 10, members: [teamMembers1] }
]

const manyTeam = [
    { id: 3, name: 10, members: [teamMembers1, teamMembers2] },
    { id: 4, name: 100, members: [teamMembers1] }
]

export { teamMembers1, teamMembers2, allTeam, oneTeam, manyTeam, memberInfo1, memberInfo2 };
