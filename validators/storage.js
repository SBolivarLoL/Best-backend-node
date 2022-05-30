const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

/* A validator for the route `/storage/:id` */
const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorGetItem };
