const {Unauthenticated} = require("../errors/index");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthenticated("No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id, username} = decoded;
    req.user = {id, username};
  } catch (err) {
    throw new Unauthenticated("Not authorized to acess this route");
  }
  next();
};
module.exports = authenticationMiddleware;
