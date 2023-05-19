<template>
    <div class="row row-cols-2 row-cols-md-2 g-4 m-3">
        <div class="col" v-for="product in this.products">
            <div class="card" :class="this.getStyleNameFromState(product)">
                <!-- <img src="{{ product.imageLink }}" alt="Product image" class="card-img-top"> -->
                <div class="card-body">
                    <div class="container text-center">
                        <div class="row"><h5 class="card-title">{{ product.name }}</h5></div>
                        <div class="row"><p class="card-text">{{ product?.state }}</p></div>
                        <div class="row"><p class="card-text">{{ this.testCountValue(product) }}</p></div>
                        <div class="row">
                            <progress max="100" :value="this.progressValue(product)"></progress>
                        </div>
                        <div class="row">
                            <router-link :to="`/products/${product.id}`" class="card-text btn btn-primary btn-sm">Go to...</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Product } from '../models/product'

export default {
    inject: ['$bus','$products'],
    data() {
        return {
            products: []
        }
    },
    created() {
        this.products = this.$products.getCurrentUserAllProducts();
        this.$bus.$on('user-change', () => { 
            this.products = this.$products.getCurrentUserAllProducts();
            this.$router.push({ path: '/' });
        });
    },
    methods: {
        getStyleNameFromState(product) {
            if(product == null) {
                return "nullProductTest";
            }
            else if(product?.state == Product.NOT_STARTED)
            {
                return "notStartedTest";
            }
            else if(product?.state == Product.RUNNING)
            {
                return "runningTest";
            }
            else if(product?.state == Product.COMPLETE_FAIL)
            {
                return "failTest";
            }
            else if(product?.state == Product.COMPLETE_SUCCESS)
            {
                return "successTest";
            }
            else {
                return "unknownStateTest";
            }
        },
        progressValue(product) {
            return (product.currentTestId === -1 ? 0 : product.currentTestId / product.tests?.length === 0 ? 1 : product.tests?.length)*100;
        },
        testCountValue(product) {
            return `${product.currentTestId === -1 ? 0 : product.currentTestId}/${product.tests?.length}`
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