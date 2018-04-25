const answerSchema = require('../models/answers.model');
const voteAnswerSchema = require('../models/voteAnswers.model')
const jwt = require('jsonwebtoken');

class Answer {
  static addAnswer(req,res){
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    let obj = {
      userId: decoded.id,
      questionId: req.body.questionId,
      content: req.body.content
    }
    answerSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message: 'success add answer',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message: 'something went wrong',
        err
      })
    })
  }

  static showAnswer (req,res) {
      // console.log(req.headers);
    answerSchema.find({
      questionId: req.headers.questionid
    })
    .populate('userId')
    .exec()
    .then(data => {
      res.status(200).json({
        message: 'list answer',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static delete(req,res) {
    answerSchema.findByIdAndRemove(req.params.id)
    .then(data => {
      res.status(200).json({
        message: 'answer deleted',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'something went wrong',
        err
      })
    })
  }

  static upVote(req,res){
    console.log(req.headers.token);
    console.log(req.body.answerId);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    voteAnswerSchema.findOne({
      userId: decoded.id,
      answerId: req.body.answerId
    }).then(data => {
      console.log(data)
      if (data) {
        data.userId = data.userId,
        data.questionId = data.questionId
        data.vote += 1
        data.save()
        .then(votedData => {
          res.status(200).json({
            votedData
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'something went wrong',
            err
          })
        })
      } else {
        let obj = {
          userId: decoded.id,
          questionId: req.body.questionId,
          vote: 1
        }
        voteQuestionSchema.create(obj)
        .then(votedData => {
          res.status(200).json({
            votedData
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'something went wrong',
            err
          })
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'something went wrong',
        data
      })
    })
  }
  
  static showVoteAnswer(req,res){
    voteAnswerSchema.findOne({
      answerId: req.headers.answerid
    })
    .then(data => {
      res.status(200).json({
        message:'votes found',
        data
      })
    })
    .catch(err =>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static downVote(req,res) {
    console.log(req.headers.token);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    voteAnswerSchema.findOne({
      userId: decoded.id,
      questionId: req.body.questionId
    }).then(data => {
      data.userId = data.userId,
      data.questionId = data.questionId
      data.vote -= 1
      data.save()
      .then(votedData => {
        res.status(200).json({
          message: 'succes downvote',
          votedData
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'vote is not found'
      })
    })
  }
  

}

module.exports = Answer