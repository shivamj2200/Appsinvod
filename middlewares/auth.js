const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
module.exports.authHandler = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new Error("There is no authorization token");
    }
   
    let token = req.headers["authorization"].split(" ")[1];

    let verfiedToken = jwt.verify(token, process.env.ACCESS_SEKRET_KEY);
    let userDetails = await User.findOne({email:verfiedToken.data.email})
   
    if (userDetails) {
        let userData = {
            id:userDetails._id,
            latitude:userDetails.latitude,
            longitude:userDetails.longitude
        }
        req.user = userData;
        next();
    } else {
        throw new Error("User not found");
   }

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: err.name
      })
    }
    return res.status(400).json({
      message: err.message,
    });
  }
};
