const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: function (req, res) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = hash
    user.save().then(data_user => {
      res.status(200).json({
        message: 'success create User',
        data_user
      })
    })
  },
  signIn: function (req, res) {
    User.findOne({
      email: req.body.email
    }).then(data => {
      if (data) {
        const checkPass = bcrypt.compareSync(req.body.password, data.password)
        if (checkPass) {
          const token = jwt.sign({id: data._id, name: data.name}, process.env.SECRET)
          res.status(200).json({
            message: 'login success',
            name: data.name,
            token: token
          })
        }
      }
    })
  }
};