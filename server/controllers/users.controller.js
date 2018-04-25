const userSchema = require('../models/users.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


class User{
  static signUp(req,res){
    const salt = bcryptjs.genSaltSync(saltRounds);
    const password = bcryptjs.hashSync(req.body.password, salt);
    let obj = {
      name:req.body.name,
      email:req.body.email,
      password:password
    }
    userSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'user created',
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

  static signIn(req,res){
    let target = {
      email:req.body.email
    }
    userSchema.findOne(target)
    .then(data=>{
      if(data) {
        let clarify = bcryptjs.compareSync(req.body.password, data.password)
        if(clarify){
          let token = jwt.sign({id: data._id, name: data.name}, process.env.SECRET)
          res.status(200).json({
            message: 'login success',
            name: data.name,
            id: data._id,
            token: token
          })
        }
      } else {
        res.status(403).json({
          message:'password wrong'
        })
      }
    })
    .catch(err=>{
      res.status(407).json({
        message:'user not found',
        err
      })
    })
  }
}
module.exports = User