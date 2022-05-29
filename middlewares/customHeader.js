const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === 'curiquiTaka') {
      next();
    } else {
      res.status(403);
      res.send({error: 'Tu API Key no es correcta'});
    }
  } catch (error) {
    res.status(500)
    res.send({error: "MI LOCO, TENEMOS UN ERROR"})
  }
}

module.exports = customHeader;