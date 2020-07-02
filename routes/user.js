const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");
const bodyValidator = require("../util/body_validator");
const auth = require("../auth/auth");

router.use("/assistant", auth);
//Add new user
router.post(
  "/assistant/new",
  auth,
  users.validate("body"),
  bodyValidator,
  users.new
);
// Retrieve all Users
router.get("/assistant/all/:current_user", auth, users.all);

// Retrieve a single User with user_id
router.get("/assistant/:assistant_id", auth, users.getById);

// Update User Info with user_id
router.put("/assistant/update/:assistant_id", auth, users.update);

// Delete a User with user_id
router.delete("/assistant/delete/:assistant_id", auth, users.delete);

module.exports = router;
