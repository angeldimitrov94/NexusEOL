<template>
    <div class="m-3">
        <div class="container-fluid" v-if="this.$users.isUserCurrentlySignedIn() === false">
            <div class="row">
                <h1>Please log in.</h1>
            </div>
        </div>
        <div class="container-fluid" v-if="this.$users.isUserCurrentlySignedIn() === true && this.product !== null">
            <div class="row">
                <TestListAndDetails :tests="this?.product?.tests"></TestListAndDetails>
            </div>
        </div>
        <div class="container-fluid" v-if="this.$users.isUserCurrentlySignedIn() === true && this.product === null">
            <div class="row">
                <h1>No products are defined for this user. Please contact your administrator for help.</h1>
            </div>
        </div>
    </div>
</template>

<script>
import { Product } from '../models/product';
import TestListAndDetails from '../components/TestListAndDetails.vue';

export default {
    props: ["id"],
    inject: ["$users", "$bus", '$products'],
    created() {
        this.product = this.$products.getCurrentUserProductById(this.id);

        this.$bus.$on("user-change", () => {
            this.product = this.$products.getCurrentUserProductById(this.id);
        });
    },
    data() {
        return {
            product: {}
        };
    },
    watch: {
        id(newId, oldId) {
            this.product = this.$products.getCurrentUserProductById(newId);
        }
    },
    components: { TestListAndDetails }
}
</script>