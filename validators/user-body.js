const Joi = require("joi");

module.exports = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    avatar: Joi.string().required().min(1).max(100),
  });
  return schema.validate(body);
};
