
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("RefreshToken");
});

module.exports = router;