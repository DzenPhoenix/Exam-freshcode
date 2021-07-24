const Catalog = require('../../db/mongo/models/Catalog.js');

const removeChatFromCatalog = async function(req, res, next){
  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $pull: { chats: req.body.chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
module.exports=removeChatFromCatalog;
