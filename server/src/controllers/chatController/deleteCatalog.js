const Catalog = require('../../models/mongoModels/Catalog.js');

const deleteCatalog = async function(req, res, next){
  try {
    await Catalog.remove(
      { _id: req.body.catalogId, userId: req.tokenData.userId });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports=deleteCatalog;
