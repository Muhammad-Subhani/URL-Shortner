const express = require("express");
const router = express.Router();
const {showpage , getdata} = require("../controller/control");
const { restrictuser } = require("../middlewares/middlewareforlogin");
router.get("/" ,restrictuser(["NORMAL" , "ADMIN"]), showpage);
router.get("/api/user" ,restrictuser(["NORMAL" , "ADMIN"]), getdata);
module.exports = router;