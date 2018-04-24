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
router.post('/votequestion', Question.upVote);
router.get('/votequestions', Question.showVote);
router.get('/votequestiondown', Question.downVote);
router.delete('/:id', Question.delete);

module.exports = router;