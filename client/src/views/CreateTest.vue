<template>
    <div class="m-3">
        <h4>Edit test</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Name
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
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button>
        </div>
    </div>
</template>
<script lang="ts">
import { type TestAttrs } from '@testsequencer/common';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { ProductUtil } from '@/utils/productutils';
export default {
    props: {
        id: { type: String, default: "" },
    },
    mounted() {
        this.id
    },
    data() {
        return {
            name: "",
            description: "",
            active: true,
            $products: {} as ProductUtil,
            $bus: new EventBus()
        }
    },
    created() {
        const { $products, $bus } = getAllInjectedUtils();

        this.$data.$products = $products;
        this.$data.$bus = $bus
    },
    methods: {
        async submit() {

            try {
                const newTest = {} as TestAttrs;
                newTest.name = this.name;
                newTest.description = this.description;
                const result = await this.$data.$products.postTest(newTest);

                if(result) {
                    this.$data.$bus.$emit('test-created', {
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