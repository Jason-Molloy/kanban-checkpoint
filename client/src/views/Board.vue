<template>
  <div class="board container-fluid" v-if="board._id">
    <button @click="logoutUser">
      Logout
    </button>
    {{board.title}}
    {{board.description}}
    <button class="btn btn-primary" v-on:click="showForm = !showForm">New List</button>
    <span v-show="showForm">
      <form @submit.prevent="createList">
        <input type="text" v-model="newList.title" placeholder="List Name">
        <button type="submit">Add List</button>
      </form>
    </span>
    <div class="d-flex row">
      <list v-for="listObj in lists" :listData='listObj'>
      </list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
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
        showForm: true,
        newList: {
          title: ''
        }
      }
    },
    methods: {
      createList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('addList', this.newList)
      },
      logoutUser() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>