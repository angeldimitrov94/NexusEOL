import { Account } from "../models/account";

export class AccountUtil {
    async getAllAccounts(): Promise<Account[]> {
        let allAccounts: Account[] = [];
        await fetch('accounts.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allAccounts = data as Account[];
        });

        return allAccounts;
    }

    async appendAndPersistNewAccount(newAccount: Account) {
        //
    }

    async getAccountById(id: number) {
        const allAccounts = await this.getAllAccounts();
        return allAccounts?.find(account => account.id === id);
    }

    async updateAccountWithId(id: number, updatedAccount: Account) {
        //
        return true;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $accounts: AccountUtil
    }
}