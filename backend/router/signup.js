const express = require('express');
const router = express.Router();
const {showsignpage , signupfunc, loginfunc , loginpage} = require('../controller/control');
router.get("/", showsignpage);
router.get("/login", loginpage)
router.post("/" , signupfunc);
router.post("/login" , loginfunc)
module.exports = router;