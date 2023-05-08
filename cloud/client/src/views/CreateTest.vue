<template>
    <div class="m-3">
        <h4>Edit test</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Name
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
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button>
        </div>
    </div>
</template>
<script>
import { Test } from '../models/test';
export default {
    props: ['id'],
    inject: ['$products','$bus'],
    data() {
        return {
            name: "",
            description: "",
            active: true
        }
    },
    methods: {
        submit() {

            try {
                const newTest = new Test(this.name, this.description);
                const success = this.$products.createNewTestForCurrentUser(this.id, newTest);

                if(success === true) {
                    this.$bus.$emit('test-created', {
                        id: newTest.id,
                    });

                    alert(`New test created!\r\n${JSON.stringify(newTest)}`);
                }
                else {
                    alert(`Failed to create new test!`);
                }
            } catch (error) {
                alert(`Failed to create new test! - ${error}`);
                console.error(error);
            }

            this.name = '';
            this.description = '';
            this.active = true;
        }
    }
}
</script>