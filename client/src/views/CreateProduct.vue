<template>
    <div class="m-3">
        <h1>Create a new product</h1>
        <div class="container mb-3">
            <form action="">
                <div class="mb-3">
                    <label for="" class="form-label">
                        Product name
                    </label>
                    <input type="text" class="form-control" v-model="this.name" />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">
                        Description
                    </label>
                    <textarea type="text" class="form-control" rows="5" v-model="this.description"></textarea>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="this.active">
                        <label class="form-check-label" for="gridCheck1">Is Active</label>
                    </div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click.prevent="this.submitForm" :disabled="this.isFormInvalid">Create
                        Page</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { Product } from '../models/product';

export default {
    inject: ['$products', '$bus'],
    props: {
        pageCreated: { type: Function }
    },
    computed: {
        isFormInvalid() {
            return !this.name || !this.description;
        }
    },
    data() {
        return {
            name: '',
            description: '',
            active: true
        }
    },
    methods: {
        submitForm() {
            if (!this.name || !this.description) {
                alert('Missing data!');
                return;
            }

            try {
                const product = new Product(this.name, this.description, [], this.active);
                const success = this.$products.createNewProductForCurrentUser(product);

                if(success === true) {
                    this.$bus.$emit('product-created', {
                        id: product.id,
                    });

                    alert(`New product created!\r\n${JSON.stringify(product)}`);
                }
                else {
                    alert(`Failed to create new product!`);
                }
            } catch (error) {
                alert(`Failed to create new product! - ${error}`);
                console.error(error);
            }

            this.name = '';
            this.description = '';
            this.active = true;
        }
    }
}
</script>