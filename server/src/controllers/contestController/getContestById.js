const db = require('../../models/index.js');
const ServerError =require('../../errors/ServerError.js');
const CONSTANTS = require('../../constants.js');


const getContestById = async function(req, res, next){
  try {
    let contestInfo = await db.Contests.findOne({
      where: { id: req.headers.contestid },
      order: [
        [db.Offers, 'id', 'asc'],
      ],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports=getContestById;
