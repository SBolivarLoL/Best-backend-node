const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");


const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorGetItem };