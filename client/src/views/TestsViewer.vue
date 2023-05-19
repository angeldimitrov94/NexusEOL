<template>
    <div class="m-3">
        <h4>Tests</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Edit Test</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ name, id: testId, description, active } in this.product?.tests" :key="testId">
                    <td>{{ name }}</td>
                    <td>{{ testId }}</td>
                    <td>{{ description }}</td>
                    <td>{{ active ? 'yes' : 'no' }}</td>
                    <td><router-link class="btn btn-primary btn-sm"
                            :to="{ name: 'TestEdit', params: { productId: this.id, testId: testId } }">Edit Test</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link :to="{ name: 'CreateTest', params: { id: this.id } }" class="btn btn-primary btn-sm">+ New test +</router-link>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['$products'],
    props: ['id'],
    data() {
        return {
            product: null
        }
    },
    created() {
        this.product = this.$products.getCurrentUserProductById(this.id);
    },
    methods: {
        edit(test) {

        }
    }
}
</script>