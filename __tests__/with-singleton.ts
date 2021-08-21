// import {createUser, updataUserName} from '../src/functions-without-context'
// import { prismaMock } from '../src/singleton'

// test('create new user', async() => {
//     const user = {
//         id:1,
//         name:"koki",
//         email:"aaaaa.@prisma.com",
//         acceptTermsAndConditions:true
//     }

//     prismaMock.user.create.mockResolvedValue(user);

//     await expect(createUser(user)).resolves.toEqual({
//         id:1,
//         name:"koki",
//         email:"aaaaa.@prisma.com",
//         acceptTermsAndConditions:true
//     })
// }) 

// test('update user name', async() => {
//     const user = {
//         id:1,
//         name:"koki higami",
//         email:"aaaaa.@prisma.com",
//         acceptTermsAndConditions:true
//     } 

//     prismaMock.user.update.mockResolvedValue(user)

//     await expect(updataUserName(user)).resolves.toEqual({
//             id:1,
//             name:"koki higami",
//             email:"aaaaa.@prisma.com",
//             acceptTermsAndConditions:true
//     })
// })

// test('should fail user does not accept terms', async () => {
//     const user = {
//         id:1,
//         name:"koki",
//         email:"aaaaa.@prisma.com",
//         acceptTermsAndConditions:false
//     }

//     prismaMock.user.create.mockRejectedValue(new Error('aaaaaaaaaaaaaaaaaa'))

//     await expect(createUser(user)).resolves.toEqual(
//         new Error('user must accept terms')
//     )
// })