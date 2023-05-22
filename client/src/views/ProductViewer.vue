<template>
    <div class="m-3">
        <div class="container-fluid" v-if="$users.isUserCurrentlySignedIn() === false">
            <div class="row">
                <h1>Please log in.</h1>
            </div>
        </div>
        <div class="container-fluid" v-if="$users.isUserCurrentlySignedIn() === true && product !== null">
            <div class="row">
                <TestListAndDetails :tests="product?.tests"></TestListAndDetails>
            </div>
        </div>
        <div class="container-fluid" v-if="$users.isUserCurrentlySignedIn() === true && product === null">
            <div class="row">
                <h1>No products are defined for this user. Please contact your administrator for help.</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Product } from '../models/product';
import TestListAndDetails from '../components/TestListAndDetails.vue';
import { EventBus } from '@/utils/eventbus';
import { ProductUtil } from '@/utils/productutils';
import { UserUtil } from '@/utils/userutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';

export default {
    props: { 
        id: { type: Number, default: -1 },
    },
    created() {
        const { $products, $bus, $users } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$users = $users;

        this.setProduct(this.id);

        this.$data.$bus.$on("user-change", () => {
            this.setProduct(this.id);
        });
    },
    data() {
        return {
            product: new Product(),
            $bus: new EventBus(),
            $products: new ProductUtil(),
            $users: new UserUtil()
        };
    },
    watch: {
        id(newId, oldId) {
            this.setProduct(newId);
        }
    },
    methods: {
        setProduct(id: number) {
            const currentUserProductByID = this.$data.$products.getCurrentUserProductById(id);

            if(currentUserProductByID === undefined) {
                this.product = new Product()
            }
            else {
                this.product = currentUserProductByID;
            }
        }
    },
    components: { TestListAndDetails }
}
</script>