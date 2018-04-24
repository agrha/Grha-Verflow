<template lang="html">
  <div class="container">
    <NavBar class="fixed-top"></NavBar>
    <div class="row">
      <div class="jumbotron col-md-3" style="background-color: #ffffff">
        <h5>Hi, {{name}}</h5>
        <hr class="my-4">
        <AddQuestion></AddQuestion>
      </div>
      <div class="col-md-7">
        <div class="card" v-for="(data, index) in questions.slice().reverse()" :key="index">
          <div class="card-header">
            <router-link :to="{path: 'Detail', params: {id: data._id}}">
              {{data.title}}
            </router-link>
          </div>
          <div class="card-body">
            <p>{{data.content}}</p>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Asked by: <cite title="Source Title">{{data.userId.name || name}}</cite></footer>
            </blockquote>
          </div>
          <div class="card-footer text-muted">
            <router-link :to="{name: 'Detail', params: {id: data._id}}">
              <button type="button" class="btn btn-outline-success">Give Answer</button>
            </router-link>
            <button @click ="deleteQuestion(data._id)" type="button" class="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AddQuestion from '@/components/AddQuestion'
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token')
    }
  },
  computed: {
    ...mapGetters([
      'questions'
    ])
  },
  created: function () {
    this.fetchQuestions()
  },
  methods: {
    ...mapActions([
      'fetchQuestions',
      'deleteQuestion'
    ]),
    addQuestion: function () {
      console.log(this.token)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/question',
        headers: {
          token: this.token
        },
        data: {
          title: this.title,
          content: this.content
        }
      }).then(({ data }) => {
        console.log(data)
        this.showQuestion()
      })
    },
    showQuestion: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/question'
      }).then(({ data }) => {
        console.log(data)
        this.questions = data.data
        console.log(this.questions)
      })
    }
  },
  components: {
    AddQuestion, NavBar
  }
}
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 17px;
}
</style>
