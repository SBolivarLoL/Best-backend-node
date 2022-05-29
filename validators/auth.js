const {check} = require('express-validator');
const validateResults = require("../utils/handleValidators");

const validatorRegisterUser = [
  check("name").exists().notEmpty().isLength({min: 3}),
  check("age").exists().notEmpty().isNumeric(),
  check("password").exists().notEmpty().isLength({min: 6}),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const validatorLoginUser = [
  check("password").exists().notEmpty().isLength({min: 6}),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

module.exports = { validatorRegisterUser, validatorLoginUser };