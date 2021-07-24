const Conversation = require('../../db/mongo/models/conversation.js');

const favoriteChat = async function(req, res){
  const predicate = 'favoriteList.' +
    req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.favoriteFlag } }, { new: true });
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports=favoriteChat;
