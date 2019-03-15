<template>
  <div class="board container-fluid" v-if="board._id">
    <div id="navbar" class="d-flex row justify-content-between">
      <button class="btn btn-outline-danger btn-lg" @click="logoutUser">
        Logout
      </button>
      <h1 contentEditable="true">{{board.title}}</h1>
      <router-link :to="{name: 'boards'}">
        <button class="btn btn-outline-danger btn-lg">
          Back
        </button>
      </router-link>
    </div>
    <div class="row">
      <div class="col-4 offset-4 justify-content-between" contentEditable="true">
        <h2>{{board.description}}</h2>
      </div>
    </div>
    <div class="col-4 offset-4 justify-content-center">
      <button class="btn btn-lg btn-block btn-dark" v-on:click="showForm = !showForm">New List</button>
      <span v-show="showForm">
        <form @submit.prevent="createList">
          <input v-model="newList.title" class="form-control form-control-lg" placeholder="List Name">
          <button class="btn btn-dark btn-block" @click="showForm = !showForm" type="submit">Add List</button>
        </form>
      </span>
    </div>
    <div class="d-flex row justify-content-center">
      <list v-for="listObj in lists" :listData='listObj'></list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    props: ["boardId"],
    mounted() {
      this.$store.dispatch('setActiveBoard', this.boardId)
      this.$store.dispatch('getLists', this.boardId)
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      }
    },
    data() {
      return {
        showForm: false,
        newList: {
          title: ''
        }
      }
    },
    methods: {
      createList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('addList', { ...this.newList })
        this.newList.title = ''
      },
      logoutUser() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      List
    }
  };
</script>

<style>
  h3 {
    opacity: 0;
  }
</style>