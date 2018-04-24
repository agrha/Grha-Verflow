const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteanswerSchema = new Schema({
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

module.exports = mongoose.model('VoteAnswer', voteanswerSchema);