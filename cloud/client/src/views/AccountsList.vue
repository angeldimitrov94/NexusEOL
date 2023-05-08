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
                <tr v-for="{ name, id, active } in this.allAccounts" :key="id">
                    <td>{{ name }}</td>
                    <td>{{ id }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm" :to="{ name: 'AccountEdit', params: { id: id } }">Edit
                        Account</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/accounts/manage/create" class="btn btn-primary btn-sm">+ Add new account +</router-link>
        </div>
    </div>
</template>
<script>
export default {
    inject: ['$accounts'],
    props: ['id'],
    data() {
        return {
            allAccounts: []
        }
    },
    async created() {
        this.allAccounts = await this.$accounts.getAllAccounts();
    }
}
</script>