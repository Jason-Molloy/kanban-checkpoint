<template>
  <div class="card border-primary mb-3 d-flex col-3">
    <div class="card-header">Header
      <div class="card-body text-primary">
        <h5 class="card-title">Primary card title</h5>
        <p class="card-text">Some
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {

    },
    data() {
      return {

      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      logoutUser() {
        this.$store.dispatch('logout')
      }
    },
    components: {

    }
  }
</script>


<style scoped>
</style>