const connection = require("../db_connection");
const util = require("util"); // helper


const admin= async (req, res, next) => {
    // const query = util.promisify(connection.query).bind(connection);
    const { type } = req.headers;
    if (type == "1") {
      res.locals.admin = admin[0];
      next();
    } else {
      res.status(403).json({
        msg: "you are not authorized to access this route !",
      });
    }
  };
module.exports = admin;