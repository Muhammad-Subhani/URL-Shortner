const express = require("express");
const router = express.Router();
const {handlegeneratenewshortenid, redirectingURL , showinfo } = require("../controller/control");
const { restrictuser } = require("../middlewares/middlewareforlogin");
router.post("/" ,restrictuser(['NORMAL' , 'ADMIN']), handlegeneratenewshortenid);
// router.get("/" , showall)
router.get("/analytics/:id" ,restrictuser(['ADMIN']), showinfo)
router.get("/:concise" , redirectingURL)
module.exports = router;
//here i placed /all at the top , the reason is that if you place /:concise above /all while calling /all you will get an error because express bari bari hr route ko match krta hy usko lgta hy kay ap /:concise de rahy ho or all to database me koi url nhi hay lehaza resutl undefined hota hy or undefined.result