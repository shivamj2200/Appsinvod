const bcrypt = require("bcrypt");

module.exports.bcryptPassword = async (plainPassword) => {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  return hashPassword;
};