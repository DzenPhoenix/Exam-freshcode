const Conversation = require('../../db/mongo/models/conversation.js');
const controller = require('../../socketInit.js');

const blackList = async function (req, res){
  const predicate = 'blackList.' +
    req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.blackListFlag } }, { new: true });
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports=blackList;
