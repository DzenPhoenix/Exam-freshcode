const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares.js');
const hashPass = require('../middlewares/hashPassMiddle.js');
const userController = require('../controllers/userController/userController.js');
const checkToken = require('../middlewares/checkToken.js');
const validators = require('../middlewares/validators.js');
const upload = require('../utils/fileUpload.js');

const userRouter = express.Router();

userRouter.get(
  '/getUser',
  checkToken.checkAuth,
);

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

userRouter.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

userRouter.post(
  '/recover',
  validators.validateRecover,
  userController.recoverPassword,
);

userRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
userRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);
userRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

module.exports=userRouter;

