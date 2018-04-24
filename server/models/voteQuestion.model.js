const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votequestionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  vote: Number
});

const VoteQuestion = mongoose.model('VoteQuestion', votequestionSchema);
module.exports = VoteQuestion