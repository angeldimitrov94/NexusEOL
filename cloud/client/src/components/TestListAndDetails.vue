<template>
  <div class="col-md-2 col-sm-3">
    <ul class="nav flex-md-column">
      <li v-for="test in this.tests" class="nav-item">
        <a class="nav-link" :class="isThisIdActiveClass(test.id)" href="#" :key="test?.id"
          @click.prevent="makeThisIdActiveId(test.id)">
          <img src="page.svg" alt="page icon" />
          {{ test?.name }}
        </a>
      </li>
    </ul>
  </div>
  <div class="col-md-8 col-sm-10">
    <div class="vstack gap-3">
      <div class="p-2">
        <h1>{{ this.currentlySelectedTest?.name }}</h1>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Messages</h5>
            <div class="card-text overflow-auto">
              <ul v-for="{ dateTime, level, text } in this.currentlySelectedTest?.messages">
                <li>{{ dateTime.padEnd(25, ' ') }} - {{ level.padEnd(6, ' ') }} - {{ text }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Actions</h5>
            <div class="card-text">
              <p>{{ this.currentlySelectedTest?.actions?.message === undefined ? "No actions pending" :
                this.currentlySelectedTest?.actions?.message }}</p>
              <button type="button" class="btn btn-success disabled">Proceed</button>
              <button type="button" class="btn btn-danger disabled">Abort</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tests'],
  inject: ['$bus'],
  created() {

  },
  data() {
    return {
      currentlySelectedTestId: '0',
      currentlySelectedTest: {}
    }
  },
  watch: {
    currentlySelectedTestId(newTestId, oldTestId) {
      this.currentlySelectedTest = this.tests.find(test => test.id == newTestId);
    }
  },
  methods: {
    makeThisIdActiveId(id) {
      this.currentlySelectedTestId = id;
    },
    isThisIdActiveClass(id) {
      return id === this.currentlySelectedTestId ? "active" : "";
    }
  }
}
</script>