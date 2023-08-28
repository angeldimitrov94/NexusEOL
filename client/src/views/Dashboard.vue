<template>
    <h2 v-if="products === undefined || products.length === 0">No products are defined, contact your account administrator for assistance.</h2>
    <div class="row row-cols-2 row-cols-md-2 g-4 m-3">
        <div class="col" v-for="product in products">
            <div class="card" :class="getStyleNameFromState(product)">
                <!-- <img src="{{ product.imageLink }}" alt="Product image" class="card-img-top"> -->
                <div class="card-body">
                    <div class="container text-center">
                        <div class="row"><h5 class="card-title">{{ product.name }}</h5></div>
                        <div class="row"><p class="card-text">{{ product?.state }}</p></div>
                        <div class="row"><p class="card-text">{{ testCountValue(product) }}</p></div>
                        <div class="row">
                            <progress max="100" :value="progressValue(product)"></progress>
                        </div>
                        <div class="row">
                            <router-link :to="`/portal/products/${product.id}`" class="card-text btn btn-primary btn-sm">Go to...</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { EventBus } from '@/utils/eventbus';
import { ProductUtil } from '@/utils/productutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductState, type ProductAttrs } from '@testsequencer/common';
import { UserUtil } from '@/utils/userutils';
import type CookieUser from '@/models/cookie-user';

export default {
    data() {
        return {
            products: [] as ProductAttrs[],
            $products: {} as ProductUtil,
            $bus: new EventBus(),
            $users: {} as UserUtil,
            signedIn: false
        }
    },
    async created() {
        const { $products, $bus, $users } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$users = $users;
        await this.userAndProductsRefresh();

        this.$data.$bus.$on('user-change', this.userAndProductsRefresh);
    },
    methods: {
        async userAndProductsRefresh() {
            this.$data.signedIn = await this.$data.$users.isUserCurrentlySignedIn();
            this.products = await this.$data.$products.getAllProducts();

            if(!this.$data.signedIn) {
                this.$router.push({ path: '/portal' });
            }
        },
        getStyleNameFromState(product: ProductAttrs) {
            if(product == null) {
                return "nullProductTest";
            }
            else if(product?.state == ProductState.NOT_STARTED)
            {
                return "notStartedTest";
            }
            else if(product?.state == ProductState.RUNNING)
            {
                return "runningTest";
            }
            else if(product?.state == ProductState.COMPLETE_FAIL)
            {
                return "failTest";
            }
            else if(product?.state == ProductState.COMPLETE_SUCCESS)
            {
                return "successTest";
            }
            else {
                return "unknownStateTest";
            }
        },
        progressValue(product: ProductAttrs) {
            const testAttemptIdInt: number = parseInt(product.mostRecentTestAttemptId);
            return (testAttemptIdInt === -1 ? 0 : testAttemptIdInt / product.tests?.length === 0 ? 1 : product.tests?.length)*100;
        },
        testCountValue(product: ProductAttrs) {
            const testAttemptIdInt: number = parseInt(product.mostRecentTestAttemptId);
            return `${testAttemptIdInt === -1 ? 0 : testAttemptIdInt}/${product.tests?.length}`
        }
    }
}
</script>

<style>
.nullProductTest {
    background-color: gray;
}
.notStartedTest {
    background-color: #98a3ee;
}
.runningTest {
    background-color: #eeeb98;
}
.failTest {
    background-color: #ee9898;
}
.successTest {
    background-color: #98eeaf;
}
.unknownStateTest {
    background-color: white;
}
</style>