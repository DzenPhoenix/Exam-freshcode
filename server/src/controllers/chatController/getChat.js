const Message = require('../../models/mongoModels/Message.js');
const userQueries = require('../queries/userQueries.js');

const getChat = async function (req, res, next) {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          '_id': 1,
          'sender': 1,
          'body': 1,
          'conversation': 1,
          'createdAt': 1,
          'updatedAt': 1,
        },
      },
    ]);

    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports=getChat;
