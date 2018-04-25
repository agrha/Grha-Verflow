const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteAnswerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  vote: Number
});

module.exports = mongoose.model('VoteAnswer', voteAnswerSchema);