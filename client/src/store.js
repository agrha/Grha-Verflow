import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
let url = `http://localhost:3000`

Vue.use(Vuex)

const state = {
  questions: [],
  question: {},
  answers: [],
  votes: []
}

const getters = {
  questions: state => {
    return state.questions
  },
  question: state => {
    return state.question
  },
  answers: state => {
    return state.answers
  },
  votes: state => {
    return state.votes
  }
}

const actions = {
  fetchQuestions ({commit}) {
    axios.get(`${url}/overflows/question`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log('hasil fetch', response.data.data)
        commit('fetchData', response.data.data)
      })
      .catch(err => {
        console.log('fetch failed', err.message)
      })
  },
  editQuestion ({commit}, payload) {
    // console.log('masuk edit')
    // console.log(payload)
    state.loadingEdit = true
    axios.put(`${url}/blogs/${payload.id}`, payload.formData, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log('edit', response.data.savedData)
        state.loadingEdit = false
        commit('editData', response.data.savedData)
      })
      .catch(err => {
        console.log('error edit', err)
        state.loadingEdit = false
      })
  },
  addQuestion ({commit}, payload) {
    // console.log(payload)
    axios.post(`${url}/overflows/question`, payload, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data.data)
        commit('addData', response.data.data)
        swal(
          'Add Question Successs',
          `${response.data.data.title} is created`,
          'success'
        )
        state.loading = false
      })
      .catch(err => {
        console.log(err.message)
        swal({
          type: 'error',
          title: 'Create Blog Failed',
          text: err.message
        })
        state.loading = false
      })
  },
  deleteQuestion ({commit}, obj) {
    axios.delete(`${url}/overflows/${obj}`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        swal({
          title: 'Are you sure?',
          text: 'You will delete this question',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        }).then(result => {
          if (result.value) {
            swal(
              'Delete Blog Success',
              `${response.data.data.title} is deleted`,
              'success'
            )
            commit('deleteData', obj)
          }
        })
      })
      .catch(err => {
        console.log('error when deleting article', err)
      })
  },
  getOneQuestion ({commit}, obj) {
    // console.log(obj)
    axios.get(`${url}/overflows/question/${obj}`)
      .then(response => {
        console.log(response.data.data)
        commit('fetchOneData', response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  fetchAnswers ({commit}, payload) {
    axios.get(`${url}/overflows/answer`, {headers: {questionid: payload}})
      .then(response => {
        console.log('ini hasil fetch answer', response.data.data)
        commit('fetchAnswers', response.data.data)
      })
  },
  fetchVotes ({commit}, payload) {
    axios.get(`${url}/overflows/votequestions`, {headers: {questionid: payload}})
      .then(response => {
        console.log('ini hasil fetchvotes', response.data.data)
        commit('fetchVotes', response.data.data)
      })
  },
  addAnswer ({commit}, payload) {
    // console.log(payload)
    let obj = {
      questionId: payload.questionId,
      content: payload.content
    }
    axios.post(`${url}/overflows/answer`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log('ini balikan dari answer', response.data.data)
        commit('addAnswer', response.data.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  upVoteQuestion ({commit}, payload) {
    // console.log(payload)
    let obj = {
      questionId: payload
    }
    axios.put(`${url}/overflows/votequestion`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data.votedData)
        commit('updateVoteQuestion', response.data.votedData)
      })
      .catch(err => {
        console.log(err)
      })
  },
  downVoteQuestion ({commit}, payload) {
    // console.log(payload)
    let obj = {
      questionId: payload
    }
    axios.put(`${url}/overflows/votequestiondown`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data.votedData)
        commit('updateVoteQuestion', response.data.votedData)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteAnswer ({commit}, obj) {
    axios.delete(`${url}/overflows/answer/${obj}`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        swal({
          title: 'Are you sure?',
          text: 'You will delete this answer',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        }).then(result => {
          if (result.value) {
            swal(
              'Delete Blog Success',
              `${response.data.data.title} is deleted`,
              'success'
            )
            commit('deleteAnswer', obj)
          }
        })
      })
      .catch(err => {
        console.log('error when deleting article', err)
      })
  }
}

const mutations = {
  fetchData (state, payload) {
    state.questions = payload
  },
  fetchOneData (state, payload) {
    // console.log(payload)
    state.question = payload
  },
  fetchAnswers (state, payload) {
    state.answers = payload
  },
  fetchVotes (state, payload) {
    if (payload) {
      state.votes = []
      state.votes.push(payload)
    } else {
      state.votes = [{
        vote: 0
      }]
    }
  },
  addData (state, payload) {
    // console.log('ini mutations', payload)
    state.questions.push(payload)
  },
  addAnswer (state, payload) {
    state.answers.push(payload)
  },
  updateVoteQuestion (state, payload) {
    state.votes.splice(0, 1, payload)
  },
  editData (state, payload) {
    console.log(payload)
    let index = state.articles.findIndex(question => question._id === payload.id)
    console.log(index)
    state.articles.splice(index, 1, payload)
  },
  deleteData (state, payload) {
    state.questions.map((data, index) => {
      if (payload === data._id) {
        state.questions.splice(index, 1)
      }
    })
  },
  deleteAnswer (state, payload) {
    state.answers.map((data, index) => {
      if (payload === data._id) {
        state.answers.splice(index, 1)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
