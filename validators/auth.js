const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

/* A validator for the register route. */
const validatorRegisterUser = [
  check("name").exists().notEmpty().isLength({ min: 3 }),
  check("age").exists().notEmpty().isNumeric(),
  check("password").exists().notEmpty().isLength({ min: 6 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

/* A validator for the login route. */
const validatorLoginUser = [
  check("password").exists().notEmpty().isLength({ min: 6 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegisterUser, validatorLoginUser };
