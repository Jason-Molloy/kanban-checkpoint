<template>
    <div class="task">
        <div class="list card border-dark mb-1 d-flex col">
            <div class="card-header">
                <div class="card-body text-dark">
                    <div class="dropdown dropright">
                        <h5 style="display: inline-block;" class="card-title">{{taskData.description}}</h5>
                        <button style="display: inline-block;" class="btn btn-sm btn-outline-danger dropdown-toggle"
                            type="button" id="dropdownMenuButton" data-toggle="dropdown">
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-for="list in lists" @click="moveTask(list._id)">Move To:
                                {{list.title}}</a>
                        </div>
                    </div>
                    <button class="btn btn-dark" v-on:click="showForm = !showForm">Add Comment</button>
                    <span v-show="showForm">
                        <form @submit.prevent="addComment">
                            <textarea type="text" class="form-control" v-model="newComment.content"
                                placeholder="comment"></textarea>
                            <button class="btn btn-outline-dark" v-on:click="showForm = !showForm"
                                type="submit">Submit</button>
                        </form>
                    </span>
                    <button class="btn btn-danger" @click="deleteTask">Delete Task</button>
                    <div v-for="comment in taskData.comments" class="list card border-dark mb-1 d-flex col">
                        <div class="card-header">
                            <div class="card-body text-dark ">
                                <h5 class="card-title">{{comment.content}}</h5>
                                <p class="card-title">{{comment.createdAt | formatTime}}</p>
                                <p class="card-title">Commenter: {{comment.user}}</p>
                                <button class="btn btn-outline-danger" @click="deleteComment(comment._id)">
                                    Delete Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Moment from 'moment'
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
                    user: this.$store.state.user.name,
                    taskId: this.taskData._id,
                    listId: this.taskData.listId,
                    boardId: this.taskData.boardId
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
        methods: {
            moveTask(listId) {
                this.taskData.oldListId = this.taskData.listId
                this.taskData.listId = listId
                this.$store.dispatch('editTask', this.taskData)
            },
            deleteTask() {
                this.$store.dispatch('deleteTask', this.taskData)
            },
            addComment() {
                let date = new Date()
                this.taskData.comments.push({ ...this.newComment, createdAt: date.getTime() })
                this.$store.dispatch('editTask', this.taskData)
                this.newComment.content = ''
            },
            deleteComment(id) {
                this.taskData.comments.forEach((c, index) => {
                    if (c._id == id) {
                        this.taskData.comments.splice(index, 1)
                    }
                })
                this.$store.dispatch('editTask', this.taskData)
            }
        },
        components: {},
        filters: {
            formatTime(date) {
                return Moment(String(date)).fromNow()
            }
        }
    }
</script>