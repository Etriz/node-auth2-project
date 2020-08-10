//! for stretch
function makeCheckDeptMiddleware(role) {
  return function (req, res, next) {
    if (req.decodedJwt.role && req.decodedJwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: "not permitted" });
    }
  };
}

module.exports = makeCheckDeptMiddleware;
