<template>
    <div class="m-3">
        <h4>Products</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Edit Product</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, id, description, active, tests } in this.allProducts" :key="id">
                    <td>{{ name }}</td>
                    <td>{{ id }}</td>
                    <td>{{ description }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm" :to="{ name: 'ProductEdit', params: { id: id } }">Edit
                            Product</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/products/manage/create" class="btn btn-primary btn-sm">+ Add new product +</router-link>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['$bus', '$products'],
    data() {
        return {
            allProducts: this.$products.getCurrentUserAllProducts()
        }
    },
    created() {
        this.$bus.$on('user-change', () => {
            this.allProducts = this.$products.getCurrentUserAllProducts();
        })
    }
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>