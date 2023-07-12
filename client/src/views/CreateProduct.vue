<template>
    <div class="m-3">
        <h1>Create a new product</h1>
        <div class="container mb-3">
            <form action="">
                <div class="mb-3">
                    <label for="" class="form-label">
                        Product name
                    </label>
                    <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">
                        Description
                    </label>
                    <textarea type="text" class="form-control" rows="5" v-model="description"></textarea>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="active">
                        <label class="form-check-label" for="gridCheck1">Is Active</label>
                    </div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click.prevent="submitForm" :disabled="isFormInvalid">Create
                        Page</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { ProductUtil } from '@/utils/productutils';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { type ProductAttrs, ProductState } from '@testsequencer/common';
import { UserUtil } from '@/utils/userutils';

export default {
    props: {
        pageCreated: { type: Function }
    },
    mounted() {
        this.pageCreated
    },
    computed: {
        isFormInvalid(): boolean {
            return !this.$data.name || !this.$data.description;
        }
    },
    data() {
        return {
            name: '',
            description: '',
            active: true,
            $products: new ProductUtil(),
            $bus: new EventBus(),
            $users: new UserUtil()
        }
    },
    created() {
        const { $products, $bus, $users } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus
        this.$data.$users = $users;
    },
    methods: {
        async submitForm() {
            if (!this.name || !this.description) {
                alert('Missing data!');
                return;
            }

            try {
                const currentCookieUser = await this.$data.$users.getCurrentUser();

                const product = {} as ProductAttrs;
                product.name = this.name
                product.description = this.description, 
                product.active = this.active;
                product.parentAccountId = currentCookieUser.accountId;
                product.mostRecentTestAttemptId = "-1";
                product.state = ProductState.NOT_STARTED;

                const createdProduct = await this.$data.$products.postProduct(product);

                if(createdProduct) {
                    this.$data.$bus.$emit('product-created', {
                        id: product.__id,
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