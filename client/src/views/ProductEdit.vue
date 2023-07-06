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
                <input type="text" class="form-control" disabled v-model="product.__id" />
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
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
import { type ProductAttrs } from '@testsequencer/common';

export default {
    props: { 
        id: { type: String, default: "" },
    },
    mounted() {
        this.id
    },
    async created() {
        const { $products } = getAllInjectedUtils();

        this.$data.$products = $products;

        const currentUserProductWithId = await this.$data.$products.getProduct(this.id);

        if(currentUserProductWithId === undefined) {
            return;
        }

        this.product = currentUserProductWithId;
    },
    data() {
        return {
            product: {} as ProductAttrs,
            $products: new ProductUtil()
        }
    },
    methods: {
        async submit() {
            const updateResult = await this.$data.$products.patchProduct(this.product);

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
