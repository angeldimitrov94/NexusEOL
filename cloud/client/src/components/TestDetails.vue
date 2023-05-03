<template>
  <div class="col">
    <div class="vstack gap-3">
      <div class="p-2">
        <h1>{{ this.test?.name }}</h1>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Subtest messages</h5>
            <div class="card-text overflow-auto">
              <ul v-for="message in this.test?.messages">
                <li>{{ message }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Actions required</h5>
            <div class="card-text">
              <p>{{ this.test.actions?.message }}</p>
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
  inject: ['$users', '$bus'],
  data() {
    return {
      productId: 0,
      testId: 0,
      test: {}
    }
  },
  created() {
    this.productId =
      this.test = this.$users.getTestFromCurrentUser(this.productId, this.testId)
  }
}
</script>