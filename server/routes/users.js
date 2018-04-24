var express = require('express');
var router = express.Router();
const { signUp,signIn } = require('../controllers/users.controller')

/* GET users listing. */
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
module.exports = router;
