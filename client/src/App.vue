<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import Checker from '@/assets/checker.jpg'
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    }
  }
</script>

<style>
  #app {
    font-family: 'Bungee Inline', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-image: url('assets/checker.jpg');
    background-size: cover;
    min-height: 100vh
  }
</style>