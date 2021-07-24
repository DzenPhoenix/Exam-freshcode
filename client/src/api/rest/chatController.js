import http from '../interceptor';

const getPreviewChat = () => http.post('/chat/getPreview');
const getDialog = (data) => http.post('/chat/getChat', data);
const newMessage = (data) => http.post('/chat/newMessage', data);
const changeChatFavorite = (data) => http.post('/chat/favorite', data);
const changeChatBlock = (data) => http.post('/chat/blackList', data);
const getCatalogList = (data) => http.post('/chat/getCatalogs', data);
const addChatToCatalog = (data) => http.post('/chat/addNewChatToCatalog', data);
const createCatalog = (data) => http.post('/chat/createCatalog', data);
const deleteCatalog = (data) => http.post('/chat/deleteCatalog', data);
const removeChatFromCatalog = (data) => http.post('/chat/removeChatFromCatalog', data);
const changeCatalogName = (data) => http.post('/chat/updateNameCatalog', data);

const chatController = {
    getPreviewChat,
    getDialog,
    newMessage,
    changeChatFavorite,
    changeChatBlock,
    getCatalogList,
    addChatToCatalog,
    createCatalog,
    deleteCatalog,
    removeChatFromCatalog,
    changeCatalogName,
}

export default chatController;