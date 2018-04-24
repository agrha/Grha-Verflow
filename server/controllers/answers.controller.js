const answerSchema = require('../models/answers.model');
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
}

module.exports = Answer