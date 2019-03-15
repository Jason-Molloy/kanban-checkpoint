<template>
  <div class="list card border-dark m-1 d-flex col-4">
    <div class="card-header">
      <div class="card-body text-dark">
        <h5 class="card-title" contentEditable="true">{{listData.title}}</h5>
        <button class="btn btn-danger" @click="deleteList">Delete List</button>
        <button class="btn btn-dark" v-on:click="showForm = !showForm">New Task</button>
        <span v-show="showForm">
          <form @submit.prevent="addTask">
            <input type="text" class="form-control" v-model="newTask.description" placeholder="Task Name">
            <button class="btn btn-outline-dark" @click="showForm = !showForm" type="submit">Add Task</button>
          </form>
        </span>
        <task v-for="taskObj in tasks" :taskData='taskObj' :listData='listData'></task>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    props: ['listData'],
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      return this.$store.dispatch('getTasks', this.listData)
    },
    data() {
      return {
        showForm: false,
        newTask: {
          listId: this.listData._id,
          boardId: this.listData.boardId,
          description: ''
        }
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id] || []
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.listData)
      },
      addTask() {
        this.$store.dispatch('addTask', { ...this.newTask })
        this.newTask.description = ''
      }
    },
    components: {
      Task
    }
  }
</script>


<style scoped>
  .card {
    max-width: 30%;
  }

  .list {
    background: white
  }
</style>