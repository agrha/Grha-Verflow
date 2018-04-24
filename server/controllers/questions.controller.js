const Question = require('../models/question.model');
const VoteQuestion = require('../models/voteQuestion.model');
const jwt = require('jsonwebtoken');


module.exports = {
  addQuestion: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    const questions = new Question()
    questions.title = req.body.title
    questions.content = req.body.content
    questions.userId = decoded.id
    questions.save().then( data => {
      res.status(200).json({
        message: 'succes create question',
        data
      })
    })
  },
  showQuestion: function (req, res) {
    Question.find().populate('userId').exec().then(data => {
      res.status(200).json({
        message: 'list question',
        data
      })
    })
  },
  showOne: function (req, res) {
    console.log(req.params.id);
    Question.findOne({
      _id: req.params.id
    }).populate('userId').exec().then(data => {
      res.status(200).json({
        message: 'question detail',
        data
      })
    })
  },
  upVote: function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    VoteQuestion.findOne({
      userId: decoded.id,
      questionId: req.body.questionId
    }).then(data => {
      res.status(200).json({
        data
      })
      if (data) {
        let updateVote = data.vote + 1
        VoteQuestion.updateOne({
          userId: decoded.id,
          questionId: req.body.questionId
        },{
          $set:{
            vote: updateVote
          }
        }).then(datas => {
          res.status(200).json({
            datas
          })
        })
      } else {
        const voteq = new VoteQuestion()
        voteq.userId = decoded.id
        voteq.questionId = req.body.questionId
        voteq.vote = 1
        voteq.save().then(data_vote => {
          res.status(200).json({
            data_vote
          })
        })
      }
    })
  },
  showVote: function (req, res) {
    console.log(req.headers);
    VoteQuestion.findOne({
      questionId: req.headers.questionid
    })
    .then(data => {
      res.status(200).json({
        message:'HAHA',
        data
      })
    })
  },
  downVote: function (req, res) {
    console.log(req.headers);
    VoteQuestion.findOne({
      questionId: req.headers.questionid
    }).then(datas => {
      let updateVote = datas.vote - 1
      VoteQuestion.updateOne({
        questionId: req.headers.questionid
      },{
        $set: {
          vote: updateVote
        }
      }).then(data => {
        res.status(200).json({
          message: 'min vote',
          data
        })
      })
    })
  }
};