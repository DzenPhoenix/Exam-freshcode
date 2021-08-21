const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants.js');
const userQueries = require('../queries/userQueries.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const credentials = require('../../../credentials/credentials.js');

const recoverPassword = async function (req, res, next) {
  const token = req.body.token;
  if(token){
    const { email, password } = jwt.decode(token);
    const hashPass = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
    const foundUser = await userQueries.findUser({ email });
    const accessToken = jwt.sign({
      firstName: foundUser.firstName,
      userId: foundUser.id,
      role: foundUser.role,
      lastName: foundUser.lastName,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
      rating: foundUser.rating,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    await userQueries.updateUser({ password: hashPass }, foundUser.id);
    res.send({ token: accessToken });
  }
  else{
    try {
      await userQueries.findUser({ email: req.body.email });
      const passwordToken = jwt.sign({
        email: req.body.email,
        password: req.body.password,
      }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
      const transporter = nodemailer.createTransport({
        host: credentials.host,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: credentials.email,
          pass: credentials.password,
        },
      });
      const htmlBody = '<!DOCTYPE html>'+
                       '<html>'+
                          '<head>'+
                            '<title>Recover password</title>'+
                          '</head>'+
                          '<body>'+
                            '<a href=http://localhost:3000/recoverPassword?token='+passwordToken+'>Recover password</a>'+
                          '</body>'+
                        '</html>';
      await transporter.sendMail({
        from: 'SquadHelp@ukr.net',
        to: `${req.body.email}`,
        subject: 'Recover password',
        html: htmlBody,
      });
      res.status(200).send('OK');
    }
    catch (err) {
      next(err);
    }
  }
};

module.exports = recoverPassword;
