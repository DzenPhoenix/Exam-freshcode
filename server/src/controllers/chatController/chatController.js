const addMessage = require('./addMessage.js');
const getChat = require('./getChat.js');
const getPreview = require('./getPreview.js');
const blackList = require('./blackList.js');
const favoriteChat = require('./favoriteChat.js');
const createCatalog = require('./createCatalog.js');
const updateNameCatalog = require('./updateNameCatalog.js');
const addNewChatToCatalog = require('./addNewChatToCatalog.js');
const removeChatFromCatalog = require('./removeChatFromCatalog.js');
const deleteCatalog = require('./deleteCatalog.js');
const getCatalogs = require('./getCatalogs.js');

module.exports={
  addMessage,
  getChat,
  getPreview,
  blackList,
  favoriteChat,
  createCatalog,
  updateNameCatalog,
  addNewChatToCatalog,
  removeChatFromCatalog,
  deleteCatalog,
  getCatalogs,
};
