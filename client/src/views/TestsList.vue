<template>
    <div class="m-3">
        <h4>Tests</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Edit Test</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, __id: testId, description, active } in tests" :key="testId">
                    <td>{{ name }}</td>
                    <td>{{ testId }}</td>
                    <td>{{ description }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm"
                            :to="{ name: 'TestEdit', params: { productId: id, testId: testId } }">Edit Test</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link :to="{ name: 'CreateTest', params: { id: id } }" class="btn btn-primary btn-sm">+ New test +</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
import { type ProductAttrs, type TestAttrs } from '@testsequencer/common';

export default {
    props: { 
        id: { type: String, default: "" },
    },
    data() {
        return {
            product: {} as ProductAttrs,
            $products: {} as ProductUtil,
            tests: [] as TestAttrs[]
        }
    },
    async created() {
        const { $products } = getAllInjectedUtils();

        this.$data.$products = $products;

        const productWithId = await this.$data.$products.getProduct(this.id);
        this.$data.tests = await $products.getAllTests(this.id);

        if(productWithId !== undefined) {
            this.product = productWithId;
        }
    }
}
</script>