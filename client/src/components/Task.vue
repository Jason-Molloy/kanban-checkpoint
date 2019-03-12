<template>
    <div class="task">
        <div class="list card border-primary mb-1 d-flex col-3">
            <div class="card-header">
                <div class="card-body text-primary">
                    <h5 class="card-title">task {{taskData.description}}</h5>
                    <button>Add Comment</button>
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
            return {}
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