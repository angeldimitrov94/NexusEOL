<template>
  <div class="col-md-2 col-sm-3">
    <ul class="nav flex-md-column">
      <li v-for="test in tests" class="nav-item">
        <a class="nav-link" :class="isThisIdActiveClass(test?.id)" href="#" :key="test?.id"
          @click.prevent="makeThisIdActiveId(test?.id)">
          <img src="/page.svg" alt="page icon" />
          {{ test?.name }}
        </a>
      </li>
    </ul>
  </div>
  <div class="col-md-8 col-sm-10">
    <div class="vstack gap-3">
      <div class="p-2">
        <h1>{{ currentlySelectedTest?.name }}</h1>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Messages</h5>
            <div class="card-text overflow-auto">
              <!-- <ul v-for="{ dateTime, level, text } in currentlySelectedTest?.messages">
                <li>{{ dateTime.padEnd(25, ' ') }} - {{ level.padEnd(6, ' ') }} - {{ text }}</li>
              </ul> -->
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Actions</h5>
            <div class="card-text">
              <!-- <p>{{ actionText }}</p> -->
              <button type="button" class="btn btn-success disabled">Proceed</button>
              <button type="button" class="btn btn-danger disabled">Abort</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { TestAttrs } from '@testsequencer/common';
import type { ProductUtil } from '@/utils/productutils';
import { getAllInjectedUtils } from '@/utils/injector-utils';

export default {
  props: { 
    productId: String,
  },
  mounted() {
    this.productId
  },
  async created() {
    const { $products } = getAllInjectedUtils();

    this.$data.$products = $products;
    this.$data.tests = await $products.getAllTests(this.productId);
    this.setCurrentlySelectedTest(this.$data.currentlySelectedTestId);
  },
  data() {
    return {
      currentlySelectedTestId: "",
      currentlySelectedTest: {} as TestAttrs,
      $products: {} as ProductUtil,
      tests: [] as TestAttrs[]
    }
  },
  watch: {
    currentlySelectedTestId(newTestId: string, oldTestId) {

      const selectedTest = this.tests?.find(test => test.id == newTestId);

      if(!selectedTest) {
        console.error(`Invalid test id [${newTestId}] passed in, could not find a test with that id.`);
        return;
      }

      this.currentlySelectedTest = selectedTest;
    }
  },
  methods: {
    makeThisIdActiveId(id: string|undefined) {
      if(!id) return;

      this.currentlySelectedTestId = id;
    },
    isThisIdActiveClass(id: string|undefined) {
      if(!id) return "";

      return id === this.currentlySelectedTestId ? "active" : "";
    },
    setCurrentlySelectedTest(id: string) {
      if(!id) return;

      const selectedTest = this.tests?.find(test => test.id == id);

      if(!selectedTest) {
        console.error(`Invalid test id [${id}] passed in, could not find a test with that id. Tests : `);
        console.error(this.productId);
        console.error(this.currentlySelectedTest);
        return;
      }

      this.currentlySelectedTest = selectedTest;
    }
  },
  computed: {
    // actionText() {
    //   const currentlySelectedTest = this.currentlySelectedTest;
    //   console.log(currentlySelectedTest);
      
    //   const actionTextValue = currentlySelectedTest === undefined || currentlySelectedTest?.currentActionIndex === -1 ? "No actions for this test" :
    //   currentlySelectedTest?.actions[currentlySelectedTest.currentActionIndex]?.message;
    //   console.log(actionTextValue);
      
    //   return actionTextValue;
    // }
  }
}
</script>