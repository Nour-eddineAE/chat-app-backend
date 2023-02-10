const validateBody = require("../validators/user-body");
const validate = require("../middlewares/validate-request-body");
const User = require("../models/user");
const express = require("express");

const router = express.Router();
const middlewares = [validate(validateBody)];

// get all users
router.get("/", async (request, response) => {
  const users = await User.find();
  response.send(users);
});

// get user by id
router.get("/:id", async (request, response) => {
  const userId = request.params.id;

  const user = await User.findById(userId);

  if (!user) return response.status(400).send("No user with the given id");

  response.send(user);
});

// create a new user
router.post("/", middlewares, async (request, response) => {
  let user = new User({
    name: request.body.name,
    avatar: request.body.avatar,
  });
  user = await user.save();

  response.status(200).send(user);
});

// update an user
router.put("/:id", middlewares, async (request, response) => {
  const userId = request.params.id;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: request.body.name,
      avatar: request.body.avatar,
    },
    { new: true }
  );

  if (!user) return response.status(400).send("No user with the given id");

  response.status(200).send(user);
});

// remove user
router.delete("/:id", async (request, response) => {
  const userId = request.params.id;

  const user = await User.findByIdAndDelete(userId);
  if (!user) response.status(400).send("No user with the given id");

  response.send(user);
});

module.exports = router;
