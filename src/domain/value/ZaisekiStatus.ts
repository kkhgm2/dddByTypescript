export class ZaisekiStatus {
    static Zaiseki = 0;
    static Kyukai = 1;
    static Taikai = 2;

    status: number;

    constructor(status: number) {

        // let intstatus = Number.parseInt(status);
        // if (!(intstatus.toString() === status)) {
        //     throw new Error("ステータスは半角数字にしてください")
        // }
        // if (this.isStatus(intstatus)) {
        //     this.status = intstatus;
        // } else {
        //     throw new Error("ステータスは設定されている物を使用してください")
        // }
        if (this.isStatus(status)) {
            this.status = status;
        } else {
            throw new Error("ステータスは設定されている物を使用してください")
        }
    }

    private isStatus(status: number) {
        const allStatus = [ZaisekiStatus.Zaiseki, ZaisekiStatus.Kyukai, ZaisekiStatus.Taikai]
        for (let st of allStatus) {
            if (st === status) {
                return true;
            }
        }
        return false;
    }
}