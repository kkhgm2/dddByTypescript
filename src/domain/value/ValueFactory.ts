import { Member } from "../entity/Member";
import { MailAddress } from "./MailAddress";

export class ValueFactory {

    static mailAddressFactory(mailAddress: string): Promise<MailAddress> {
        const result = MailAddress.isDuplicated(mailAddress)

        return result.then((r) => {
            if (r) {
                return Promise.reject()
            } else {
                return new MailAddress(mailAddress);
            }
        }).catch((error) => {
            throw new Error('メールアドレスが重複しています');
        });
    }
}