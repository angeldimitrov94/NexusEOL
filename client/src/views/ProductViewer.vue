<template>
    <div class="m-3">
        <div class="container-fluid" v-if="isSignedIn == false">
            <div class="row">
                <h1>Please log in.</h1>
            </div>
        </div>
        <div class="container-fluid" v-if="isSignedIn === true">
            <div class="row">
                <TestListAndDetails :product-id="product?.__id"></TestListAndDetails>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TestListAndDetails from '../components/TestListAndDetails.vue';
import { EventBus } from '@/utils/eventbus';
import { ProductUtil } from '@/utils/productutils';
import { UserUtil } from '@/utils/userutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { type ProductAttrs } from '@testsequencer/common';

export default {
    props: { 
        id: { type: String, required: true },
    },
    async created() {
        const { $products, $bus, $users } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$users = $users;

        this.setProduct(this.id);

        this.$data.$bus.$on("user-change", () => {
            this.setProduct(this.id);
        });

        this.$data.isSignedIn = await this.$users.isUserCurrentlySignedIn();
    },
    data() {
        return {
            product: {} as ProductAttrs,
            $bus: new EventBus(),
            $products: new ProductUtil(),
            $users: new UserUtil(),
            isSignedIn: false
        };
    },
    watch: {
        id(newId, oldId) {
            this.setProduct(newId);
        }
    },
    methods: {
        async setProduct(id: string) {
            const currentUserProductByID = await this.$data.$products.getProduct(id);

            if(currentUserProductByID) {
                this.product = currentUserProductByID;
            }
        },
        async isSignedIn(): Promise<boolean> {
            return await this.$users.isUserCurrentlySignedIn();
        }
    },
    components: { TestListAndDetails }
}
</script>