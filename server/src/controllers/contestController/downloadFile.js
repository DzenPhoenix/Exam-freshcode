const CONSTANTS = require('../../constants.js');

const downloadFile = async function(req, res){
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports=downloadFile;
