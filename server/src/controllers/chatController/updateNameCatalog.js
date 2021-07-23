const Catalog = require('../../models/mongoModels/Catalog.js');

const updateNameCatalog = async function(req, res, next){
  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { catalogName: req.body.catalogName }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports=updateNameCatalog;
