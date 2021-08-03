export class User {
    public readonly id: number;
    public readonly name: string;

    public constructor (user:{id:number; name: string}) {
        this.id = user.id;
        this.name = user.name;
    }
}