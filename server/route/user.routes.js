const { Router } = require("express");
const { getSelf } = require("../controller/user.controller");

const router = Router();

router.post("/self", getSelf);

module.exports = router;
