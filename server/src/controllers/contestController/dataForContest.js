const db = require('../../models/index.js');
const errors =require('../../errors/Errors.js');

const dataForContest = async function(req, res, next){
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    console.log(req.body, characteristic1, characteristic2);
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      const ServerError = errors.ServerError;
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    const ServerError = errors.ServerError;
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports=dataForContest;
