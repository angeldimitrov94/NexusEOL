import type { AccountDoc } from "@testsequencer/common";

export class AccountUtil {
    async getAllAccounts(): Promise<AccountDoc[]> {
        let allAccounts: AccountDoc[] = [];
        await fetch('accounts.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allAccounts = data as AccountDoc[];
        });

        return allAccounts;
    }

    async appendAndPersistNewAccount(newAccount: AccountDoc) {
        //
    }

    async getAccountById(id: number) {
        const allAccounts = await this.getAllAccounts();
        return allAccounts?.find(account => account.id === id);
    }

    async updateAccountWithId(id: number, updatedAccount: AccountDoc) {
        //
        return true;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $accounts: AccountUtil
    }
}