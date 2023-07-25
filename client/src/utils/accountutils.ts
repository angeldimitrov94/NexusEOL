import type { AccountAttrs } from "@testsequencer/common";
import axios from "axios";

export class AccountUtil {
    readonly nexusEolDomain: string = "www.nexuseol.com";
    usersApiRoute: string = "/api/accounts/";
    readonly baseUrl: string;

    constructor(devFlag: boolean) {
        if(devFlag === true) {
            this.baseUrl = `https://localhost${this.usersApiRoute}`;
        }
        else {
            this.baseUrl = `https://${this.nexusEolDomain}${this.usersApiRoute}`;
        }
    }

    async getAllAccounts(): Promise<AccountAttrs[]> {
        const { data, status } = await axios.get(this.baseUrl);

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
        const { data, status } = await axios.post(`${this.baseUrl}create`, 
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
        const { data, status } = await axios.get(`${this.baseUrl}${id}`);

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
        const { data, status } = await axios.patch(`${this.baseUrl}${accountId}/edit`, account);

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