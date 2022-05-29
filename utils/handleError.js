const handleHttpError = (res, errorMsg = "Tuvimos un problema", code = 403) => {
  res.status(code);
  res.send({ error: errorMsg });
}

module.exports = { handleHttpError };