const {calc} = require('../modules/calculator');

const calculateString = (req, res, next) => {
  const string = req.params.string;
  let result = 0;
  try {
    result = calc(string);
    res.send({result});
  } catch (e) {
    next(e);
  }
};


module.exports = {
   calculateString
};