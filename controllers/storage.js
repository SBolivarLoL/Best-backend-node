const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Get a list of the DB
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({}); //this is a promise, so we use async await
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al obtener el registro");
  }
};

/**
 * Get a detail of the DB
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await storageModel.findById(req.id);
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al obtener los detalles del registro");
  }
};

/**
 * Insert a record
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al crear el registro");
  }
};

/**
 * Delete a record
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const datafile = await storageModel.findById(id);
    await storageModel.delete({ _id: id });
    const filePath = `${MEDIA_PATH}/${datafile.filename}`;
    //fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al eliminar el archivo");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
};
