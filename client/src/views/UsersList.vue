<template>
    <div class="m-3">
        <h4>Users</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Id</th>
                    <th>Level</th>
                    <th>Account Name</th>
                    <th>Edit User</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, id, accountId, level } in allUsers" :key="id">
                    <td>{{ name }}</td>
                    <td>{{ id }}</td>
                    <td>{{ level }}</td>
                    <td>{{ accountId ? accountIdToName[accountId] : "N/A" }}</td>
                    <td><router-link class="btn btn-primary btn-sm"
                            :to="{ name: 'UserEdit', params: { id: id } }">Edit</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/portal/users/manage/create" class="btn btn-primary btn-sm">+ Add new user +</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import type { AccountUtil } from '@/utils/accountutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { UserUtil } from '@/utils/userutils';
import type { UserAttrs } from '@testsequencer/common';

export default {
    data() {
        return {
            allUsers: [] as UserAttrs[],
            $users: {} as UserUtil,
            $accounts: {} as AccountUtil,
            accountIdToName: {} as { [key: string]: string }
        }
    },
    async created() {
        const { $users, $accounts } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$accounts = $accounts;

        this.allUsers = await this.$data.$users.getAllUsers();
        await this.populateAccountNames();

        console.log('this.$data.accountIdToName : ' + JSON.stringify(this.$data.accountIdToName));
    },
    methods: {
        async getAccountName(accountId: string|undefined): Promise<string> {
            let accountName = "N/A";

            console.log('getAccountName() - accountId : ' + accountId);
            
            if(accountId) {
                const account = await this.$data.$accounts.getAccount(accountId);

                console.log('getAccountName() - account : ' + JSON.stringify(account));
                console.log('getAccountName() - account && account.name : ' + account && account?.name);
                
                if(account && account.name) {
                    accountName = account.name;
                    console.log('getAccountName() - accountName : ' + accountName);
                }
            }

            console.log('getAccountName() - accountName 2 : ' + accountName);

            return accountName;
        },
        async populateAccountNames() : Promise<void> {

            for (const user of this.allUsers) {
                if(user && user.accountId && !this.$data.accountIdToName[user.accountId])
                {
                    this.$data.accountIdToName[user.accountId] = await this.getAccountName(user.accountId);
                    console.log(Date.now() + ' - getAccountName() - accountName : ' + user.accountId + " = " + this.$data.accountIdToName[user.accountId]);
                }
            }

            console.log(Date.now() + ' - getAccountName() - accountIdToName : ' + JSON.stringify(this.$data.accountIdToName));
        }
    }
}
</script>