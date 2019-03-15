<template>
  <div class="login">
    <div>
      <img class="main-img" :src="Graphic">
      <h2>Get On Board With Checkyer Board</h2>
    </div>
    <form v-if="loginForm" @submit.prevent="loginUser">
      <div class="form-row justify-content-center">
        <div class="col-3">
          <input type="email" class="form-control" v-model="creds.email" placeholder="email">
        </div>
        <div class="col-3">
          <input type="password" class="form-control" v-model="creds.password" placeholder="password">
        </div>
        <button class="btn btn-dark" type="submit">Login</button>
      </div>

    </form>
    <form v-else @submit.prevent="register">
      <div class="form-row justify-content-center">
        <div class="col-3">
          <input type="text" class="form-control" v-model="newUser.name" placeholder="name">
        </div>
        <div class="col-3">
          <input type="email" class="form-control" v-model="newUser.email" placeholder="email">
        </div>
        <div class="col-3">
          <input type="password" class="form-control" v-model="newUser.password" placeholder="password">
        </div>
        <button class="btn btn-dark" type="submit">Create Account</button>
      </div>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>

  </div>
</template>

<script>
  import router from '@/router.js'
  import Graphic from '@/assets/graphic.png'

  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        Graphic
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
    color: #8e0c0f
  }

  .main-img {
    width: 55vw;
    height: 50vh;
    justify-self: center;
    margin-top: 10vh
  }

  h2:hover {
    color: #8e0c0f
  }

  h2 {
    color: black
  }
</style>