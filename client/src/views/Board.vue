<template>
  <div class="board container-fluid">
    {{board.title}}
    <button class="btn btn-primary" v-on:click="showForm = !showForm">New List</button>
    <span v-show="showForm">
      <form @submit.prevent="createList">
        <input type="text" v-model="newList.title" placeholder="List Name">
        <button type="submit">Add List</button>
      </form>
    </span>
    <div class="d-flex row">
      <list v-for="list in lists" :listData='list'>
        {{list.title}}
      </list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
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
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>