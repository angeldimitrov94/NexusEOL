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
                <tr v-for="{ name, id, description, active, tests } in allProducts" :key="id">
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

<script lang="ts">
import type { Product } from '@/models/product';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';

export default {
    data() {
        return {
            allProducts: [] as Product[],
            $bus: new EventBus(),
            $products: new ProductUtil()
        }
    },
    created() {
        const { $products, $bus } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus;

        this.allProducts = this.$data.$products.getCurrentUserAllProducts();
        this.$data.$bus.$on('user-change', () => {
            this.allProducts = this.$data.$products.getCurrentUserAllProducts();
        })
    }
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>