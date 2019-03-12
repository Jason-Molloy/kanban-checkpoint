import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, data) {
      state.activeBoard = data
    },
    setLists(state, data) {

      state.lists = data
    },
    setTasks(state, data) {
      //create a dictionary where the keys are the boardId and the values are arrays of list objects with the corresponding boardId
      //data will be an array of lists
      //use a for loop and for each list in the array check if the boardId of the list is already in the dictionary or not
      //if it's not then add a key value pair that is :boardId: [],
      // always push the lists into the array at the boardId
      state.tasks = data
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'login' })
        })
    },
    //#endregion
    //REMOVE THE ACTIVE SESSION FROM THE DATABASE

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    setActiveBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          console.log(res)
          commit('setActiveBoard', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    editBoard({ commit, dispatch }, board) {
      api.put('boards/' + board._id, board)
        .then(res => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id, board)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    addList({ commit, dispatch }, listData) {
      api.post(`boards/${listData.boardId}/lists`, listData)
        .then(serverBoard => {
          dispatch('getLists')
        })
    },
    getLists({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId + '/lists')
        .then(res => {
          console.log(res)
          commit('setLists', res.data)
        })
    },
    editList({ commit, dispatch }, listData) {
      api.put(`boards/${listData.boardId}/lists/${listData.listId}`)
        .then(res => {
          console.log(res)
          dispatch('getLists', listData.boardId)
        })
    },
    deleteList({ commit, dispatch }, listData) {
      api.delete(`boards/${listData.boardId}/lists/${listData._id}`)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },

    //#endregion
    //#region -- TASKS
    addTask({ commit, dispatch }, taskData) {
      api.post(`boards/${listData.boardId}/lists/${listData._id}/tasks`, taskData)
        .then(serverBoard => {
          dispatch('getTasks')
        })
    },
    getTasks({ commit, dispatch }, listData) {
      api.get(`boards/${listData.boardId}/lists/${listData._id}/tasks/`)
        .then(res => {
          console.log(res)
          commit('setTasks', res.data)
        })
    },
    // editTask({ commit, dispatch }, listData) {
    //   api.put(`boards/${listData.boardId}/lists/${listData.listId}`)
    //     .then(res => {
    //       console.log(res)
    //       dispatch('getLists')
    //     })
    // },
    // deleteTask({ commit, dispatch }, listData) {
    //   api.delete(`boards/${listData.boardId}/lists/${listData.listId}`)
    //     .then(res => {
    //       dispatch('getLists')
    //     })
    // }
    //#endregion
  }
})
