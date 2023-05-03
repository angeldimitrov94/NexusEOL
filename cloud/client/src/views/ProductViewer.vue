<template>
    <div class="container-fluid">
        <div class="row">
            <TestListAndDetails :tests="this.product.tests"></TestListAndDetails>
        </div> 
    </div>
</template>

<script>
import { Product } from '../models/product';
import TestListAndDetails from '../components/TestListAndDetails.vue';
import TestDetails from '../components/TestDetails.vue';

export default {
    props: ["id"],
    inject: ["$users", "$bus"],
    created() {
        if (this.id === undefined || this.id === null || this.id === "") {
            const allProducts = this.$users.getCurrentUserAllProducts();
            if (allProducts === undefined) {
                this.product = new Product("N/A", "-1", "N/A", [], false);
            }
            else {
                this.product = allProducts[0];
            }
        }
        else {
            this.product = this.$users.getCurrentUserProductById(this.id);
        }
        console.log("created() - this.product :");
        console.log(this.product);
        this.$bus.$on("user-change", () => {
            this.product = this.$users.getCurrentUserAllProducts();
            console.log("user-change");
            console.log(this.product);
        });
    },
    data() {
        return {
            product: {},
            selectedTestId: '0'
        };
    },
    watch: {
        id(newId, oldId) {
            this.$users.setCurrentlySelectedProductId(newId);
            this.product = this.$users.getCurrentUserProductById(newId);
        }
    },
    components: { TestListAndDetails, TestDetails }
}
</script>