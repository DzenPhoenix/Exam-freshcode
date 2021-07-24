const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares.js');
const contestController = require('../controllers/contestController/contestController.js');
const checkToken = require('../middlewares/checkToken.js');
const upload = require('../utils/fileUpload.js');

const contestRouter = express.Router();

contestRouter.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

contestRouter.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

contestRouter.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

contestRouter.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);


contestRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

contestRouter.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

contestRouter.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

module.exports=contestRouter;

