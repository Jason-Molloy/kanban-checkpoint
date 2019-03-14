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
    tasks: {}
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
      Vue.set(state.tasks, data.listId, data.tasks)
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
    addList({ commit, dispatch }, payload) {
      api.post(`boards/${payload.boardId}/lists`, payload)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    getLists({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId + '/lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    editList({ commit, dispatch }, listData) {
      api.put(`boards/${listData.boardId}/lists/${listData.listId}`)
        .then(res => {
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
      api.post(`boards/${taskData.boardId}/lists/${taskData.listId}/tasks`, taskData)
        .then(res => {
          console.log('adding task', res)
          dispatch('getTasks', taskData)
        })
    },
    getTasks({ commit, dispatch }, payload) {
      //Payload could be a task or a list
      api.get(`boards/${payload.boardId}/lists/${payload.listId || payload._id}/tasks/`)
        .then(res => {
          //res is an array of tasks for that listId
          let commitPayload = {
            listId: payload.listId || payload._id,
            tasks: res.data
          }
          commit('setTasks', commitPayload)
        })
    },
    editTask({ commit, dispatch }, payload) {
      api.put(`boards/${payload.boardId}/lists/${payload.listId}/tasks/${payload._id}`, payload)
        .then(res => {
          console.log(res)
          dispatch('getTasks', payload)
          if (payload.oldListId) {
            let payload2 = {
              listId: payload.oldListId,
              boardId: payload.boardId
            }
            dispatch('getTasks', payload2)
          }
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete(`boards/${payload.boardId}/lists/${payload.listId}/tasks/${payload._id}`)
        .then(res => {
          console.log('deleted task')
          dispatch('getTasks', payload)
        })
    },
    //#endregion

    //#region -- COMMENTS

    //#endregion
  }
})
