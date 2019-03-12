<template>
  <div class="list card border-primary mb-3 d-flex col-3">
    <div class="card-header">
      <div class="card-body text-primary">
        <h5 class="card-title">{{listData.title}}</h5>
        <button @click="deleteList">Delete List</button>
        <button class="btn btn-primary" v-on:click="showForm = !showForm">New Task</button>
        <span v-show="showForm">
          <form @submit.prevent="addTask">
            <input type="text" v-model="newTask.description" placeholder="Task Name">
            <button type="submit">Add Task</button>
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
          description: ''
        }
      }
    },
    computed: {
      tasks() {
        // return this.$store.state.tasks
        return []
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.listData)
      },
      addTask() {
        this.newTask.listId = listData._id
        this.$store.dispatch('addTask', this.taskData)
      }
    },
    components: {
      Task
    }
  }
</script>


<style scoped>
</style>