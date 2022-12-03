const { Router } = require("express");
const {
  fbCredentialsValidation,
  register,
} = require("../controller/auth.controller");

const router = Router();

router.post("/fbCredentialsValidation", fbCredentialsValidation);
router.post("/register", register);

module.exports = router;
