const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Get a list of the DB
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const user = req.user; // sacamos el usuario de la sesion para tener mejor trazabilidad
    const data = await tracksModel.findAllData({}); //this is a promise, so we use async await
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, error);
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
    const data = await tracksModel.findOneData(req.id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error al obtener el registro");
  }
};

/**
 * Insert a record
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error al crear el registro");
  }
};

/**
 * Update a record
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error al actualizar el registro");
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
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al eliminar el registro");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
