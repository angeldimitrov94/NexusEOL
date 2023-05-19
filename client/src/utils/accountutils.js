import { Account } from "../models/account";

export class AccountUtil {
    async getAllAccounts() {
        let allAccounts = null;
        await fetch('accounts.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allAccounts = data;
        });

        return allAccounts;
    }

    async appendAndPersistNewAccount(newAccount) {
        //
    }

    async getAccountById(id) {
        const allAccounts = await this.getAllAccounts();
        return allAccounts?.find(account => account.id === id);
    }

    async updateAccountWithId(id, updatedAccount) {
        //
        return true;
    }
}