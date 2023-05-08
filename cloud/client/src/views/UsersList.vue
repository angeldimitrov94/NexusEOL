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
                    <th>Active</th>
                    <th>Edit User</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, id, account, level, active } in this.allUsers" :key="id">
                    <td>{{ name }}</td>
                    <td>{{ id }}</td>
                    <td>{{ level }}</td>
                    <td>{{ account?.name }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm"
                            :to="{ name: 'UserEdit', params: { id: id } }">Edit</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/users/manage/create" class="btn btn-primary btn-sm">+ Add new user +</router-link>
        </div>
    </div>
</template>
<script>
export default {
    inject: ['$users'],
    data() {
        return {
            allUsers: []
        }
    },
    async created() {
        this.allUsers = await this.$users.getAllUsers();
    }
}
</script>