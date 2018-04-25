<template lang="html">
  <div class="container">
    <div class="row">
      <div class="jumbotron jumbotron-fluid col-md-8 offset-md-2">
        <div class="container">
          <button type="button" name="button" class="btn btn-danger" @click="downVoteQuestion(questionId)">
            Unlike
          </button>
          <button type="button" name="button" class="btn btn-outline-dark">{{votes[0].vote}}</button>
          <button type="button" name="button" class="btn btn-success" @click="upVoteQuestion(questionId)">
            Like
          </button>
            <h1 style="margin-top:10px"><strong><span class="badge badge-secondary">{{question.title}}</span></strong></h1>
          <p class="lead">{{question.content}}</p>
        </div>
        <blockquote class="blockquote mb-0">
          <footer class="blockquote-footer">Asked by: <cite title="Source Title">{{question.userId.name||name}}</cite></footer>
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
          <Answer v-for="(answer,index) in answers" :key="index" :answer="answer"></Answer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from '@/components/Answer'
import {mapActions, mapGetters, mapState} from 'vuex'
export default {
  components: {
    Answer
  },
  data () {
    return {
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token'),
      questionId: this.$route.params.id,
      content: '',
      url: 'http://localhost:3000'
    }
  },
  computed: {
    ...mapState([
      'votes'
    ]),
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
      'addAnswer',
      'upVoteQuestion',
      'downVoteQuestion'
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
    }
  }
}
</script>

<style lang="css">
</style>
