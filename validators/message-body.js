const Joi = require("joi");
const User = require("../models/user");

module.exports.validateBody = (body) => {
  const schema = Joi.object({
    senderId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    content: Joi.string().required().min(1).max(3000),
  });
  return schema.validate(body);
};

module.exports.validateExistance = async (request, response) => {
  const sender = await User.findById(request.body.senderId);
  const receiver = await User.findById(request.body.receiverId);

  if (!sender || !receiver)
    return response.status(400).send("No user with the given id");

  return { senderId: sender._id, receiverId: receiver._id };
};
