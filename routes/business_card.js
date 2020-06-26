const express = require("express");
const router = express.Router();
const businessCardController = require("../controllers/business-card.controller");

router.get("/businnes-card/:id", businessCardController.create);

module.exports = router;
