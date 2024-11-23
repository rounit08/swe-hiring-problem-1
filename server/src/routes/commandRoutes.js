const express = require("express");
const {
  addCommand,
  getCommands,
  addUser,
} = require("../controllers/commandController");

const router = express.Router();
// for seting the user in database
router.post("/users", addUser);
// for setting the commands associated with the user
router.post("/addCommands", addCommand);
//for getting the commands associated with the user
router.get("/getCommands", getCommands);

module.exports = router;
