/**
 * It checks if the api_key in the request header is equal to 'curiquiTaka', if it is, it calls the
 * next function, if it isn't, it sends a 403 error and a message saying that the api_key is incorrect.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to move on to the next middleware.
 */
const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "curiquiTaka") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Tu API Key no es correcta" });
    }
  } catch (error) {
    res.status(500);
    res.send({ error: "MI LOCO, TENEMOS UN ERROR" });
  }
};

module.exports = customHeader;
