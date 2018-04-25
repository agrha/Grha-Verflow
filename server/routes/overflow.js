var express = require('express');
var router = express.Router();
const Question = require('../controllers/questions.controller')
const Answer = require('../controllers/answers.controller')

/* GET users listing. */
router.post('/question', Question.addQuestion);
router.get('/question', Question.showQuestion);
router.get('/question/:id', Question.showOne);
router.post('/answer', Answer.addAnswer);
router.get('/answer', Answer.showAnswer);
router.put('/votequestion', Question.upVote);
router.get('/votequestions', Question.showVote);
router.put('/votequestiondown', Question.downVote);
router.delete('/:id', Question.delete);
router.delete('/answer/:id', Answer.delete)
router.get('/voteanswers',Answer.showVoteAnswer)
router.put('/voteanswer', Answer.upVote)
router.put('/voteanswerdown', Answer.downVote)

module.exports = router;