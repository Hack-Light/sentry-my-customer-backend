const router = require("express").Router();

router.get("*", (req, res) => {
  res.status(400);
  res.json({
    message: "Page not found"
  });
});

module.exports = router;
