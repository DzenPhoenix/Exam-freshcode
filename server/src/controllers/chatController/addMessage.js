const Conversation = require('../../models/mongoModels/conversation.js');
const Message = require('../../models/mongoModels/Message.js');
const controller = require('../../socketInit.js');

const addMessage = async function (req, res, next){
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const newConversation = await Conversation.findOneAndUpdate({
      participants,
    },
    { participants, blackList: [false, false], favoriteList: [false, false] },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    });
    const message = new Message({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation._id,
    });
    await message.save();
    message._doc.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      _id: newConversation._id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports=addMessage;
