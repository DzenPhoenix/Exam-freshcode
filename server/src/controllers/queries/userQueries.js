const db = require('../../db/postgres/models/index.js');
const errors=require('../../errors/Errors.js');
const bcrypt = require('bcrypt');

const updateUser = async function(data, userId, transaction){
  const [updatedCount, [updatedUser]] = await db.Users.update(data,
    { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

const findUser = async function(predicate, transaction){
  const result = await db.Users.findOne({ where: predicate, transaction });
  if (!result) {
    const UserNotFoundError = errors.UserNotFoundError;
    throw new UserNotFoundError('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

const userCreation = async function(data){
  const newUser = await db.Users.create(data);
  if (!newUser) {
    const ServerError = errors.ServerError;
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

const passwordCompare = async function(pass1, pass2){
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    const UserNotFoundError = errors.UserNotFoundError;
    throw new UserNotFoundError('Wrong password');
  }
};

module.exports={
  updateUser,
  findUser,
  userCreation,
  passwordCompare,
};
