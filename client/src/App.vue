<template>
  <div class="m-3">
    <Navbar class="shadow-lg"></Navbar>
    <router-view class="wave"></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue';
import { EventBus } from './utils/eventbus';
import { getAllInjectedUtils } from './utils/injector-utils';
import type { UserUtil } from './utils/userutils';

export default {
  components: { Navbar },
  async created() {
    const { $bus, $users } = getAllInjectedUtils();

    this.$data.$bus = $bus;
    this.$data.$users = $users;

    await this.userCheck();

    this.$data.$bus.$on('user-change', this.userCheck);
  },
  data() {
    return {
      $bus: new EventBus(),
      $users: {} as UserUtil,
    };
  },
  methods: {
    async userCheck() {
      const signedIn = await this.$data.$users.isUserCurrentlySignedIn();
      if (signedIn) {
        this.$router.push({ path: '/portal/dashboard' });
      } else {
        this.$router.push({ path: '/portal' });
      }
    }
  }
}
</script>

<style>
body {
  background-image: url('/layered-waves-haikei.svg');
  background-position: center;
  background-repeat: repeat;
}

.nav-item {
  color: white;
  text-decoration: none;
}

.nav-brand {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: larger;
}

.router-link-exact-active.nav-item {
  text-decoration: underline;
}

a.nav-link {
  color: white;
  text-decoration: none;
}

a.nav-link.active {
  color: white;
  text-decoration: underline;
}

.borderedimg {
  border: 5px solid white;
}

.white-font {
  color: white;
}</style>