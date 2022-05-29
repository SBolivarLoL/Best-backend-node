const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
}

/* Reading the directory of the file. */
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`))//http://localhost:3001/api/v1/tracks
  }
}); //returns array of every file located in the same folder as this file



module.exports = router