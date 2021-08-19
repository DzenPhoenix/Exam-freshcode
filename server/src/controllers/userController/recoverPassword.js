
const recoverPassword = async function (req, res, next) {
  try {
    console.log(req.body.email);
    res.send('All ok');
  } catch (err) {
    next(err);
  }
};

module.exports=recoverPassword;
