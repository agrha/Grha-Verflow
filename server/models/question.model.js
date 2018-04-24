const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: String,
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)