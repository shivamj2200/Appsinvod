const Joi = require("joi");


const user_schema = Joi.object({
  Name: Joi.string().trim().max(40).min(1).required(),
  Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  Address:Joi.string().trim().max(100).min(1).required(),
  Latitude:Joi.number().required(),
  Longitude:Joi.number().required(),
  location:Joi.object(),
  Status:Joi.string().valid('active', 'inactive').optional()
});

module.exports = { user_schema};