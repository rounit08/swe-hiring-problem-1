const { CommandHistory, User } = require("../models");

const addCommand = async (req, res) => {
  const { username, command } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newCommand = await CommandHistory.create({
      command,
      userId: user.id,
    });

    res.status(201).json(newCommand);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommands = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const commands = await CommandHistory.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(commands);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      const newUser = await User.create({ username });
      return res.status(201).json(newUser);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { addCommand, getCommands, addUser };
