<template>
    <div class="task">
        <div class="list card border-primary mb-1 d-flex col">
            <div class="card-header">
                <div class="card-body text-primary">
                    <h5 class="card-title">{{taskData.description}}</h5>
                    <button v-on:click="showForm = !showForm">Add Comment</button>
                    <span v-show="showForm">
                        <form @submit.prevent="addComment">
                            <textarea type="text" v-model="newComment.content" placeholder="Task Name"></textarea>
                            <button type="submit">Add Comment</button>
                        </form>
                    </span>
                    <button>Delete Task</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task",
        props: ["listData", "taskData"],
        created() {
            if (!this.$store.state.user._id) {
                this.$router.push({ name: "login" });
            }
        },
        data() {
            return {
                showForm: false,
                newComment: {
                    content: '',
                    taskId: this.taskData._id
                }
            }
        },
        computed: {
            lists() {
                return this.$store.state.lists
            },
            tasks() {
                return this.$store.state.tasks
            }
        },
        methods: {},
        components: {}
    }
</script>