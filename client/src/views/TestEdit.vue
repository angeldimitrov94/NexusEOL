<template>
    <div class="m-3">
        <h4>Edit test</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Name
                </label>
                <input type="text" class="form-control" v-model="this.test.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of product)
                </label>
                <input type="text" class="form-control" disabled v-model="this.test.id" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Description
                </label>
                <textarea type="text" class="form-control" rows="5" v-model="this.test.description"></textarea>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="this.test.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button>
        </div>
    </div>
</template>
<script>
export default {
    inject: ['$bus', '$products'],
    props: ['productId', 'testId'],
    created() {
        this.test = this.$products.getTestFromCurrentUser(this.productId, this.testId);
    },
    data() {
        return {
            test: null
        }
    },
    methods: {
        submit() {
            const updateResult = this.$products.updateCurrentUserTestWithId(this.productId, this.testId, this.test);

            if (updateResult === null) {
                alert('Failed to update test.');
                return;
            }

            this.$router.push({ name: 'TestsViewer', params: { id: this.productId } });
        }
    },
    computed: {
        isFormInvalid() {
            return !this.test.name || !this.test.description;
        }
    }
}
</script>