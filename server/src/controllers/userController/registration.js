const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants.js');
const errors = require('../../errors/Errors.js');
const userQueries = require('../queries/userQueries.js');


const registration = async function (req, res, next){
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass }));
    const accessToken = jwt.sign({
      firstName: newUser.firstName,
      userId: newUser.id,
      role: newUser.role,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      displayName: newUser.displayName,
      balance: newUser.balance,
      email: newUser.email,
      rating: newUser.rating,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const NotUniqueEmailError = errors.NotUniqueEmailError;
      next(new NotUniqueEmailError());
    } else {
      next(err);
    }
  }
};

module.exports=registration;
