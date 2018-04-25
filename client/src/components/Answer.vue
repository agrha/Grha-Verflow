<template>
  <div class="card" style="margin-bottom: 17px;">
    <div class="card-body">
      {{answer.content}}
    </div>
    <blockquote class="blockquote mb-0">
      <footer class="blockquote-footer">Answered by: <cite title="Source Title">{{answer.userId.name||name}}</cite></footer>
    </blockquote>
    <button @click="deleteAnswer(answer._id)" class="btn btn-danger" style="margin-top:10px">Delete</button>
    <div class="justify content center" style="margin-top:10px">
      <button type="button" name="button" class="btn btn-danger" @click="upVoteAnswer(answer._id)">
        Like
      </button>
      <button type="button" name="button" class="btn btn-outline-dark">0</button>
      <button type="button" name="button" class="btn btn-success" @click="downVoteAnswer(answer._id)">
        Unlike
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  props: ['answer'],
  data () {
    return {
      url: 'http://localhost:3000',
      name: localStorage.getItem('name'),
      votes: {}
    }
  },
  created () {
    this.fetchVoteAnswer()
  },
  updated () {
    this.fetchVoteAnswer()
  },
  methods: {
    ...mapActions([
      'deleteAnswer'
    ]),
    fetchVoteAnswer () {
      axios.get(`${this.url}/overflows/voteanswers`)
        .then(response => {
          console.log(response.data.data)
        })
        .catch(err => {
          console.log('error fetching vote answer', err)
        })
    },
    upVoteAnswer (payload) {
    console.log(payload)
    console.log(this.answer.userId._id)
      let obj = {
        userId: this.answer.userId._id,
        answerId: payload
      }
      axios.put(`${this.url}/overflows/voteanswer`, obj, {headers: {token: localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data.votedData)
          this.votes = response.data.votedData
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteAnswer (payload) {
      // console.log(payload)
      let obj = {
        answerId: payload
      }
      axios.put(`${this.url}/overflows/voteanswerdown`, obj, {headers: {token: localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data.votedData)
          this.votes = response.data.votedData
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
