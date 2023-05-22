<template>
  <div class="m-3">
    <Navbar class="shadow-lg"></Navbar>
    <router-view class="wave"></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue';

export default {
    components: { Navbar }
}
</script>

<style>
  body {
    background-image: url('./layered-waves-haikei.svg');
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
</style>