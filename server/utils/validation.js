const Joi = require('joi');

const registerValidation = Joi.object({
  Name: Joi.string().min(2).max(50).required(),
  phone_number: Joi.string().pattern(/^[0-9]+$/).length(10).required(),
  Password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  address: Joi.string().min(5).max(255).required(),
});

const loginValidation = Joi.object({
  phone_number: Joi.string().required(),
  Password: Joi.string().required(),
});

module.exports = { registerValidation, loginValidation };