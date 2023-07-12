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
                <tr v-for="{ name, __id, description, active } in allProducts" :key="__id">
                    <td>{{ name }}</td>
                    <td>{{ __id }}</td>
                    <td>{{ description }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm" :to="{ name: 'ProductEdit', params: { id: __id } }">Edit Product</router-link></td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link to="/portal/products/manage/create" class="btn btn-primary btn-sm">+ Add new product +</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
import type { ProductAttrs } from '@testsequencer/common';

export default {
    data() {
        return {
            allProducts: [] as ProductAttrs[],
            $bus: new EventBus(),
            $products: new ProductUtil()
        }
    },
    async created() {
        const { $products, $bus } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus;

        this.$data.allProducts = await this.$data.$products.getAllProducts();
        this.$data.$bus.$on('user-change', async () => {
            this.$data.allProducts = await this.$data.$products.getAllProducts();
        })
    }
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>