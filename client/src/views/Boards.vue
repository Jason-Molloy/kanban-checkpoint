<template>
  <div class="boards">
    WELCOME TO THE BOARDS!!!
    <button @click="logoutUser">
      Logout
    </button>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">
        <h2>{{board.title}}</h2>
      </router-link>
      <button v-on:click="showEditBoardForm = !showEditBoardForm">EDIT BOARD</button>
      <span v-show="showEditBoardForm">
        <form @submit.prevent="editBoard(board)">
          <input type="text" v-model="board.title" placeholder="Edit Name">
          <button type="submit" v-on:click="showEditBoardForm = !showEditBoardForm">Apply Changes</button>
        </form>
      </span>
      <button @click="deleteBoard(board)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        showEditBoardForm: false,
        newBoard: {
          title: "",
          description: ""
        },
        board: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      editBoard(board) {
        this.$store.dispatch("editBoard", board);
      },
      logoutUser() {
        this.$store.dispatch('logout')
      }
    }
  };
</script>