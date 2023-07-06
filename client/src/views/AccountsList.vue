<template>
<div class="m-3">
        <h4>Accounts</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Active</th>
                    <th>Edit Account</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, __id, active } in allAccounts" :key="__id">
                    <td>{{ name }}</td>
                    <td>{{ __id }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm" :to="{ name: 'AccountEdit', params: { id: __id } }">Edit
                        Account</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/accounts/manage/create" class="btn btn-primary btn-sm">+ Add new account +</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import type { AccountUtil } from '@/utils/accountutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import type { AccountAttrs } from '@testsequencer/common';

export default {
    data() {
        return {
            $accounts: {} as AccountUtil,
            allAccounts: [] as AccountAttrs[]
        }
    },
    async created() {
        const { $accounts } = getAllInjectedUtils();

        this.$accounts = $accounts;
        
        this.allAccounts = await this.$data.$accounts.getAllAccounts();
    }
}
</script>