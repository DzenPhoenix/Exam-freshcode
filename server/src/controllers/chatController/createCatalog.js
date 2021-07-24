const Catalog = require('../../db/mongo/models/Catalog.js');

const createCatalog = async function(req, res, next){
  console.log(req.body);
  const catalog = new Catalog({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports=createCatalog;
