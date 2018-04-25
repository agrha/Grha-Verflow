const questionSchema = require('../models/question.model');
const voteQuestionSchema = require('../models/voteQuestion.model');
const jwt = require('jsonwebtoken');

class Question {
  static addQuestion(req,res){
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    let obj = {
      title:req.body.title,
      content:req.body.content,
      userId: decoded.id
    }
    questionSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message: 'succes create question',
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

  static showQuestion(req,res){
    questionSchema.find().populate('userId').exec().then(data => {
      res.status(200).json({
        message: 'list question',
        data
      })
    })
  }

  static showOne(req,res){
    console.log(req.params.id);
    questionSchema.findOne({
      _id: req.params.id
    }).populate('userId').exec().then(data => {
      res.status(200).json({
        message: 'question detail',
        data
      })
    })
  }

  static upVote(req,res){
    // console.log(req.headers.token);
    // console.log(req.body.questionId);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    voteQuestionSchema.findOne({
      userId: decoded.id,
      questionId: req.body.questionId
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
  
  static showVote(req,res){
    voteQuestionSchema.findOne({
      questionId: req.headers.questionid
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
    console.log(req.headers);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    voteQuestionSchema.findOne({
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
  
  static delete(req,res){
    questionSchema.findByIdAndRemove(req.params.id)
    .then(data => {
      res.status(200).json({
        message: 'success deleting data',
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
}

module.exports = Question