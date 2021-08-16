const http = require('http');
const express = require('express');
const cors = require('cors');
require('./db/mongo/index.js');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./middlewares/handleError.js');
const Logger = require('./utils/logger.js');
const moment = require('moment');

const logger = new Logger();

try{
  throw new Error('Test error');
}
catch(err){
  logger.file(err);
  logger.copyAndClear(`log${moment().format('_YYYY_MM_DD')}`);
}

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'));
app.use('/user', router.userRouter);
app.use('/contest', router.contestRouter);
app.use('/chat', router.chatRouter);

app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${ PORT }!`));
controller.createConnection(server);
