<template lang="html">
  <div class="container">
    <div class="row">
      <div class="jumbotron jumbotron-fluid col-md-8 offset-md-2">
        <div class="container">
          <button type="button" name="button" class="btn btn-danger" style="float: right" @click="downVote">
            Unlike
          </button>
          <button type="button" name="button" class="btn btn-outline-dark" style="float: right">{{vote}}</button>
          <button type="button" name="button" class="btn btn-success" style="float: right" @click="upVote">
            Like
          </button>
          <h1 class="display-4">{{question.title}}</h1>
          <div class="">
          </div>
          <p class="lead">{{question.content}}</p>
        </div>
        <blockquote class="blockquote mb-0">
          <footer class="blockquote-footer">Asked by: <cite title="Source Title">{{question.userId.name}}</cite></footer>
        </blockquote>
        <div class="container">
          <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model='content' placeholder="your answer here.."></textarea>
          </div>
          <button type="button" class="btn btn-outline-success" @click="answer">Submit</button>
        </div>
      </div>
      <div class="jumbotron jumbotron-fluid col-md-6 offset-md-3">
        <h5>Answers:</h5>
        <!-- <h5>{{answers}}</h5> -->
        <div class="container">
          <div class="card" v-for="(data, index) in answers" :key="index" style="margin-bottom: 17px;">
            <div class="card-body">
              {{data.content}}
            </div>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Answered by: <cite title="Source Title">{{data.userId.name}}</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      id: this.$route.params,
      content: '',
      vote: '',
      url: 'http://localhost:3000'
    }
  },
  computed: {
    ...mapGetters([
      'question',
      'answers'
    ])
  },
  created () {
    this.getQuestion()
    this.fetchAnswers(this.$route.params.id)
    this.fetchVotes(this.$route.params.id)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getOneQuestion',
      'fetchAnswers',
      'fetchVotes',
      'addAnswer'
    ]),
    getQuestion () {
      this.getOneQuestion(this.$route.params.id)
    },
    answer () {
      let obj = {
        questionId: this.$route.params.id,
        content: this.content
      }
      this.addAnswer(obj)
    },
    upVote: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/votequestion',
        headers: {
          token: this.token
        },
        data: {
          questionId: this.id.id
        }
      }).then(({ data }) => {
        console.log(data)
        this.showVote()
      })
    },
    showVote: function () {

    },
    downVote: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/votequestiondown',
        headers: {
          token: this.token,
          questionId: this.id.id
        }
      }).then(({ data }) => {
        this.showVote()
      })
    }
  }
}
</script>

<style lang="css">
</style>
