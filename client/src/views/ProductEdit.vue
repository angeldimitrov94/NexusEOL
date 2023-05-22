<template>
    <div class="m-3">
        <h4>Edit product</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Product name
                </label>
                <input type="text" class="form-control" v-model="product.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of product)
                </label>
                <input type="text" class="form-control" disabled v-model="product.id" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Description
                </label>
                <textarea type="text" class="form-control" rows="5" v-model="product.description"></textarea>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="product.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
            <div class="mb-3">
                <router-link class="btn btn-primary btn-sm" :to="{ name: 'TestsViewer', params: { id: id } }">View {{
                    product.tests === undefined ? "N/A" : product.tests.length }} tests</router-link>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit" :disabled="isFormInvalid">Confirm
                changes</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Product } from '@/models/product';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
import { inject } from 'vue';

export default {
    props: { 
        id: { type: Number, default: -1 },
    },
    mounted() {
        this.id
    },
    created() {
        const { $products } = getAllInjectedUtils();

        this.$data.$products = $products;

        const currentUserProductWithId = this.$data.$products.getCurrentUserProductById(this.id);

        if(currentUserProductWithId === undefined) {
            return;
        }

        this.product = currentUserProductWithId;
    },
    data() {
        return {
            product: new Product(),
            $products: new ProductUtil()
        }
    },
    methods: {
        submit() {
            const updateResult = this.$data.$products.updateCurrentUserProductWithId(this.id, this.product);

            if (updateResult === null) {
                alert('Failed to update product.');
                return;
            }

            this.$router.push({ path: '/products/manage' });
        }
    },
    computed: {
        isFormInvalid() {
            return !this.product.name || !this.product.description;
        }
    }
}
</script>
