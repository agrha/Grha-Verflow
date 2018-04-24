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
    console.log(req.headers);
    console.log(req.body);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    voteQuestionSchema.findOne({
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
  }
  
  static showVote(req,res){
    // console.log(req.headers);
    console.log(req.headers.questionid)
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
    voteQuestionSchema.findOne({
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