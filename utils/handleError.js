/**
 * If the response is not OK, send an error message to the client.
 * @param res - The response object
 * @param [errorMsg=Tuvimos un problema] - The error message you want to send to the client.
 * @param [code=403] - The HTTP status code to send back to the client.
 */
const handleHttpError = (res, errorMsg = "Tuvimos un problema", code = 403) => {
  res.status(code);
  res.send({ error: errorMsg });
};

module.exports = { handleHttpError };
