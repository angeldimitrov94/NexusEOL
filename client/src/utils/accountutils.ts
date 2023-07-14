import type { AccountAttrs } from "@testsequencer/common";
import axios from "axios";

export class AccountUtil {
    async getAllAccounts(): Promise<AccountAttrs[]> {
        const { data, status } = await axios.get(`https://www.nexuseol.com/api/accounts`);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return [];
        }
        else {
            return data as AccountAttrs[];
        }
    }

    async postNewAccount(newAccount: AccountAttrs): Promise<AccountAttrs|undefined> {
        const { data, status } = await axios.post(`https://www.nexuseol.com/api/accounts/create`, 
        newAccount);

        const success = status === 201;
        if(!success) {
            console.error(data);
            return undefined;
        }
        else {
            return data as AccountAttrs;
        }
    }

    async getAccount(id: string): Promise<AccountAttrs | undefined> {
        const { data, status } = await axios.get(`https://www.nexuseol.com/api/accounts/${id}`);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return undefined;
        }
        else {
            return data as AccountAttrs;
        }
    }

    async patchAccount(accountId: string, account: AccountAttrs): Promise<AccountAttrs|undefined> {
        const { data, status } = await axios.patch(`https://www.nexuseol.com/api/accounts/${accountId}/edit`, account);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return;
        }

        return data as AccountAttrs;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $accounts: AccountUtil
    }
}