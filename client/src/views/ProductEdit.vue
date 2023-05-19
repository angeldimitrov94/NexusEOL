<template>
    <div class="m-3">
        <h4>Edit product</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Product name
                </label>
                <input type="text" class="form-control" v-model="this.product.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of product)
                </label>
                <input type="text" class="form-control" disabled v-model="this.product.id" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Description
                </label>
                <textarea type="text" class="form-control" rows="5" v-model="this.product.description"></textarea>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="this.product.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
            <div class="mb-3">
                <router-link class="btn btn-primary btn-sm" :to="{ name: 'TestsViewer', params: { id: id } }">View {{
                    this.product.tests === undefined ? "N/A" : this.product.tests.length }} tests</router-link>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit" :disabled="this.isFormInvalid">Confirm
                changes</button>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['$bus', '$products'],
    props: ['id'],
    created() {
        this.product = this.$products.getCurrentUserProductById(this.id);
    },
    data() {
        return {
            product: null
        }
    },
    methods: {
        submit() {
            const updateResult = this.$products.updateCurrentUserProductWithId(this.id, this.product);

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
