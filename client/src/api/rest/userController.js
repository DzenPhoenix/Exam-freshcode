import http from '../interceptor';

const registerRequest = (data) => http.post('/user/registration', data);
const loginRequest = (data) => http.post('/user/login', data);
const recoverRequest = (data)=>http.post('/user/recover',data);
const getUser = () => http.get('/user/getUser');
const payment = (data) => http.post('/user/pay', data.formData);
const changeMark = (data) => http.post('/user/changeMark', data);
const cashOut = (data) => http.post('/user/cashout', data);
const updateUser = (data) => http.post('/user/updateUser', data);

const userController = {
    recoverRequest,
    registerRequest,
    loginRequest,
    getUser,
    payment,
    changeMark,
    cashOut,
    updateUser,
}

export default userController;