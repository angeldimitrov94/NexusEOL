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
                <tr v-for="{ name, __id, accountId, level } in allUsers" :key="__id">
                    <td>{{ name }}</td>
                    <td>{{ __id }}</td>
                    <td>{{ level }}</td>
                    <td>{{ accountId }}</td>
                    <td><router-link class="btn btn-primary btn-sm"
                            :to="{ name: 'UserEdit', params: { id: __id } }">Edit</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/users/manage/create" class="btn btn-primary btn-sm">+ Add new user +</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { UserUtil } from '@/utils/userutils';
import type { UserAttrs } from '@testsequencer/common';

export default {
    data() {
        return {
            allUsers: [] as UserAttrs[],
            $users: new UserUtil(),
        }
    },
    async created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;

        this.allUsers = await this.$data.$users.getAllUsers();
    }
}
</script>