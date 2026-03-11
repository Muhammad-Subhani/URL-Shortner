const express = require("express");
const app = express();
const port = process.env.PORT || 8001; //always use this to make sure that someother PORT defined by any company you are woking with has a env portfile if not then use 8001
const path = require('path')
const cookieparser = require("cookie-parser");
const  myrouter  = require("./router/router");
const staticpage = require('./router/staticurl');
const signuppage = require('./router/signup');
const {checkforauthentication , restrictuser} = require("./middlewares/middlewareforlogin");
//midlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieparser());
// app.use(express.static(path.join(__dirname, "../frontend")));
app.use(checkforauthentication);


//routers incoming
app.use("/urlgive",restrictuser(["NORMAL" , "ADMIN"]), myrouter);
app.use('/signup', signuppage);
app.use("/", staticpage); // this is inline middleware ye user ko kaam nhi krny dega jb tk wo login nhi 
// setting up ejs for server side rendering 
app.use(express.static("../frontend")) // me backend say run kr raha hn to path hona chahiya shorturl/frontend , abhi backend me hen is lia ../ use kia
//? why static is used tells the browser from where to get the css or js files for the browser  . remember the path from where you starting the backend 
// connecting database
//mongodb://127.0.0.1:27017/practice-url2
const { connectdb } = require("./connections/connection");
connectdb("mongodb+srv://muhammadsubhani785_db_user:TEkH5oVgjBwHmF4I@cluster0.brevkqv.mongodb.net/practice-url2")

.then(()=>{console.log("databaes ok ");
})
.catch(()=>{console.log("database not connected ");
})
;
// app.get("/:shorturl" , async(req, res )=>{
//   const shorturl = req.params.shorturl;
//  const entry =  await mydb.findOneAndUpdate({
// shorturl
//  }
//  , {
//      $push:{
//       history :{
//         timestamps: Date.now()
//       }
//      }
//   })

//   res.redirect(entry.redirecturl)
// })
app.listen(port, () => {
  console.log(`your server is actuall started at port ${port}`);
});
