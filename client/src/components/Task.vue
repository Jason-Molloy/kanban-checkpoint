<template>
    <div class="task">
        <div class="list card border-dark mb-1 d-flex col">
            <div class="card-header">
                <div class="card-body text-dark">
                    <!-- <drag class="drag" :transfer-data="{draggable}"> -->
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
                    <!-- </drag> -->
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
                // draggable: {
                //     taskData
                // },
                showForm: false,
                newComment: {
                    content: '',
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
                this.taskData.comments.push({ ...this.newComment })
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
        components: {}
    }
</script>