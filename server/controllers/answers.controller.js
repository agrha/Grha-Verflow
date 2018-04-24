const Answer = require('../models/answers.model');
const jwt = require('jsonwebtoken');

module.exports = {
  addAnswer: function (req, res) {
    let token = req.body.userId
    let decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    const answer = new Answer()
    answer.userId = decoded.id
    answer.questionId = req.body.questionId,
    answer.content = req.body.content
    answer.save().then(data => {
      res.status(200).json({
        message: 'success add answer',
        data
      })
    })
  },
  showAnswer: function (req, res) {
    // console.log(req.headers);
    Answer.find({
      questionId: req.headers.questionid
    }).populate('userId').exec().then(data => {
      res.status(200).json({
        message: 'list answer',
        data
      })
    })
  }
};