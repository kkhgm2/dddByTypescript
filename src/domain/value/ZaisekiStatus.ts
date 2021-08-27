export class ZaisekiStatus {
    static Zaiseki: number = 0;
    static Kyukai: number = 1;
    static Taikai: number = 2;
    status: number;

    constructor(status: number) {
        status = Number(status)
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