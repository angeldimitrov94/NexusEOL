<template>
    <h4>Products</h4>
    <div class="text-end">
        <router-link to="/products/create" class="btn btn-primary btn-sm">New Product</router-link>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Description</th>
                <th>Active</th>
            </tr>
        </thead>
        <tbody>
            <tr 
            v-for="{name, id, description, active} in this.allProducts" 
            :key="id"
            @click="goToPage(id)">
                <td>{{ name }}</td>
                <td>{{ id }}</td>
                <td>{{ description }}</td>
                <td>{{ active ? 'yes' : 'no'}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    inject: ['$users','$router','$bus'],
    data() {
        return {
            allProducts: this.$users.getCurrentUserAllProducts()
        }
    },
    methods: {
        goToPage(id) {
            this.$router.push({path: `products/${id}/edit`});
        }
    },
    created() {
        this.$bus.$on('user-change', () => {
            this.allProducts = this.$users.getCurrentUserAllProducts();
        })
    }
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>