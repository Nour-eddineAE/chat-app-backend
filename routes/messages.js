const {
  validateBody,
  validateExistance,
} = require("../validators/message-body");
const validate = require("../middlewares/validate-request-body");
const Message = require("../models/message");
const express = require("express");

const router = express.Router();
const middlewares = [validate(validateBody)];

// get all messages
router.get("/", async (request, response) => {
  const messages = await Message.find().sort("_id");
  response.send(messages);
});

// get message by id
router.get("/:id", async (request, response) => {
  const messageId = request.params.id;

  const message = await Message.findById(messageId);

  if (!message)
    return response.status(400).send("No message with the given id");

  response.send(message);
});

// create a new message
router.post("/", middlewares, async (request, response) => {
  const { senderId } = await validateExistance(request, response);
  const message = new Message({
    senderId,
    content: request.body.content,
  });
  await message.save();

  response.status(200).send(message);
});

// update an message
router.put("/:id", middlewares, async (request, response) => {
  const { senderId } = await validateExistance(request, response);

  const messageId = request.params.id;
  const message = await Message.findByIdAndUpdate(
    messageId,
    {
      senderId,
      content: request.body.content,
    },
    { new: true }
  );

  if (!message)
    return response.status(400).send("No message with the given id");

  response.status(200).send(message);
});

// remove message
router.delete("/:id", async (request, response) => {
  const messageId = request.params.id;

  const message = await Message.findByIdAndDelete(messageId);
  if (!message) response.status(400).send("No message with the given id");

  response.send(message);
});

module.exports = router;
