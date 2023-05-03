<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
    <div class="position-sticky pt-3 sidebar-sticky">
      <ul class="nav flex-column">
        <li v-for="test in this.tests" class="nav-item">
          <a class="nav-link" href="#" :key="test?.id" @click.prevent="() => this.currentlySelectedTestId = test?.id">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-file align-text-bottom" aria-hidden="true">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            {{ test?.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="col">
    <div class="vstack gap-3">
      <div class="p-2">
        <h1>{{ this.currentlySelectedTest?.name }}</h1>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Messages</h5>
            <div class="card-text overflow-auto">
              <ul v-for="{dateTime, level, text} in this.currentlySelectedTest?.messages">
                <li>{{ dateTime.padEnd(25,' ') }} - {{ level.padEnd(6,' ') }} - {{ text }}</li>
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
              <p>{{ this.currentlySelectedTest?.actions?.message === undefined ? "No actions pending" : this.currentlySelectedTest?.actions?.message  }}</p>
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
      console.log(`currentlySelectedTestIdWatcher : new = [${newTestId}] | old = [${oldTestId}]`);
      this.currentlySelectedTest = this.tests.find(test => test.id == newTestId);
      console.log(this.currentlySelectedTest);
    }
  }
}
</script>