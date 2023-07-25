<template>
    <div class="m-3">
        <h4>Edit test</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Name
                </label>
                <input type="text" class="form-control" v-model="test.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of product)
                </label>
                <input type="text" class="form-control" disabled v-model="test.id" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Description
                </label>
                <textarea type="text" class="form-control" rows="5" v-model="test.description"></textarea>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="test.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button>
        </div>
    </div>
</template>
<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
import { type TestAttrs } from '@testsequencer/common';

export default {
    props: { 
        productId: { type: String, default: "" },
        testId: { type: String, default: "" },
    },
    async created() {
        const { $products } = getAllInjectedUtils();

        this.$data.$products = $products;

        const testWithId = await this.$data.$products.getTest(this.productId, this.testId);

        if(testWithId !== undefined) {
            this.test = testWithId;
        }
    },
    data() {
        return {
            test: {} as TestAttrs,
            $products: {} as ProductUtil,
        }
    },
    methods: {
        async submit() {
            const updateResult = await this.$data.$products.patchTest(this.productId, this.test);

            if (updateResult === null) {
                alert('Failed to update test.');
                return;
            }

            this.$router.push({ name: 'TestsViewer', params: { id: this.productId } });
        }
    },
    computed: {
        isFormInvalid() {
            return !this.test.name || !this.test.description;
        }
    }
}
</script>