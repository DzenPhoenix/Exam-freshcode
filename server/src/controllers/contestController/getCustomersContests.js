const db = require('../../db/postgres/models/index.js');
const errors =require('../../errors/Errors.js');

const getCustomersContests = function(req, res, next){
  db.Contests.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offers,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(
      (err) => {
        const ServerError = errors.ServerError;
        next(new ServerError(err)); });
};

module.exports=getCustomersContests;

