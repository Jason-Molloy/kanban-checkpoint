<template>
  <div class="boards container-fluid">
    <div id="navbar" class="d-flex row justify-content-center">
      <img :src="Graphic" alt="">
    </div>
    <button class="btn btn-outline-danger btn-lg mb-3" @click="logoutUser">Logout</button>
    <form @submit.prevent="addBoard">
      <div class="form-row justify-content-center">
        <div class="col-3">
          <input type="text" class="form-control" placeholder="title" v-model="newBoard.title" required>
        </div>
        <div class="col-3">
          <input type="text" class="form-control" placeholder="description" v-model="newBoard.description">
        </div>
        <button class="btn btn-dark" type="submit">Create Board</button>
      </div>
    </form>
    <div class="d-flex row justify-content-center" v-for="board in boards" :key="board._id">
      <div class="card border-dark m-1 d-flex col-3">
        <div class="card-header">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <h1>{{board.title}}</h1>
          </router-link>
          <button class="btn btn-dark" v-on:click="showEditBoardForm[board._id]++">EDIT
            BOARD</button>
          <span v-show="showEditBoardForm[board._id] % 2 == 0">
            <form @submit.prevent="editBoard(board)">
              <input type="text" v-model="board.title" placeholder="Edit Name">
              <button type="submit">Apply Changes</button>
            </form>
          </span>
          <button class="btn btn-danger" @click="deleteBoard(board)">DELETE BOARD</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Graphic from '@/assets/graphic.png'
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
        showEditBoardForm: {},
        newBoard: {
          title: "",
          description: ""
        },
        board: {
          title: "",
          description: ""
        },
        Graphic
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    watch: {
      boards: function (value) {
        let settings = {}
        value.forEach(b => {
          settings[b._id] = 1;
        })
        this.showEditBoardForm = settings
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", { ...this.newBoard });
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      editBoard(board) {
        this.$store.dispatch("editBoard", board);
        this.showEditBoardForm[board._id]++
      },
      logoutUser() {
        this.$store.dispatch('logout')
      }
    },
    components: {}
  };
</script>
<style>
  h1 {
    color: #8e0c0f
  }

  img {
    width: 35vw;
    height: 30vh;
    margin-bottom: 10px;
    margin-top: 8vh
  }

  .btn-dark {
    background-color: black
  }

  .btn-danger {
    background-color: #8e0c0f
  }

  .btn-outline-danger {
    color: #8e0c0f
  }

  .form-control {
    border: 5px solid rgba(0, 0, 0, .9);
  }
</style>