// these links are related to generating a unique cookie
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const express = require("express")
const path = require("path")
//require the folder where you made hashmap of user and givin it value uuid
const { setUid, showid } = require("../services/service1");
// getting 2 models first to store the links  and redirect other for sign up or login
const mydb = require("../model/model");
const mydb2 = require("../model/signup");
// Generating a short key so that we can use it as a short url
const shortid = require("shortid");

// post request for the redirect url storage from user input field
async function handlegeneratenewshortenid(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ status: "write url correctly " });
  }
  const shortId = shortid();
  try {
    // console.log(req.user);

    await mydb.create({
      shorturl: shortId,
      redirecturl: body.url,
      history: [],
      createdby: req.user._id,
      role : body.role,
    });

    //? res.render("hello", { id: shortId });
// res.redirect('/login.html') 
res.json({id : shortId});
  } catch (error) {
    const err = body.url;
    const data = await mydb.find({});
    const errobj = data.find((user) => user.redirecturl == err);
    console.log(errobj);
    // res.render("hello", {
    //   msg: `already created the shorted link: http://localhost:8001/urlgive/${errobj.shorturl} `,
    // });
    res.json({msg:`already created the shorted link: http://localhost:8001/urlgive/${errobj.shorturl} `})
  };
  //    return res.status(200).json({id : shortId})
  // this would give a  json response
}
// this thing does the majic of short url , actually you are accessing the servers another route (appears short)
async function redirectingURL(req, res) {
  const concise_url = req.params.concise;
  const result = await mydb.findOneAndUpdate(
    { shorturl: concise_url },
    {
      $push: {
        history: {
          timestamps: Date.now(),
        },
      }, 
    },
  );
  res.redirect(result.redirecturl);
}
// for analytics side
async function showinfo(req, res) {
  try {
      // const result = await mydb.find({});
      // const user = result.find((user) => user._id == id);
  // const id = String(req.params.id);
  const user = await mydb.findById(req.params.id);
  if (!user) {
    res.json({msg : `you are not getting the object by id ${id}`})
  }
  else{
    const length =user.history.length;
    const arr = [];
    user.history.map((obj) => {
      arr.push(obj.timestamps);
    });
    res.status(200).json({ Times_visit: length, Time: arr });

  }
  } catch (error) {
    res.json({msg: " someything is wrong "});
    console.log(error);
    
  }

}
//render the home page
async function showpage(req, res) {
  if (req.user) {
    res.sendFile(path.join(__dirname , "../../frontend/index.html"));
  }
  // the path to current folder is /home/subhani/documnet/shorturl/backend/controller . with join you are modifying ti to  /home/subhani/document/shorturl/frontend/index.js to render file 
}
//render signup page
async function showsignpage(req, res) {
res.sendFile(path.join(__dirname , "../../frontend/signup.html"));
}
//renders the login p return nullage
async function loginpage(req, res) {
  res.sendFile(path.join(__dirname , "../../frontend/login.html"));

}
//verifying the login , sending cookie , and redirecting to main page
async function signupfunc(req, res) {
  const { name, email, password } = req.body;

  try {
    await mydb2.create({
      name: name,
      email: email,
      password: password,
    });
    const user = await mydb2.findOne({
      email: email,
      password: password,
    });
    const chekctoken = setUid(user);
    res.cookie("uuid", chekctoken);
        res.json({success : true})
  } catch (error) {
    // res.render("sign", { msg: `Incorrect or repeated entries` });
    res.json({msg: `Incorrect or repeated entries`})
  }
}
async function loginfunc(req, res) {
  const { email, password } = req.body;
  try {
    const user = await mydb2.findOne({
      email: email,
      password: password,
    });
    if (user) {
      //   const sessionId = uuidv4(); using tokens instead
      const chekctoken = setUid(user);
      res.cookie("uuid", chekctoken);
      res.json({success : true})
    
     
      // res.json({chekctoken});
    } else {
      // res.render("login", { msg: `No Such User Or Wrong Entries` });
      res.json({msg: `No Such User Or Wrong Entries`})
    }
  } catch (error) {
    // res.render("login", { msg: `Incorrect or repeated entries` });
    res.json({msg: `Incorrect or repeated entries`})
  }
}
async function getdata(req , res) {
  if (req.user) {
    const infourls = await mydb.find({createdby : req.user._id})
    res.json({status : "success" , info : infourls});
  }
  else{
      res.json({msg : `cant get the data `});
  }
  
}
module.exports = {
  handlegeneratenewshortenid,
  redirectingURL,
  showinfo,
  showpage,
  signupfunc,
  showsignpage,
  loginpage,
  loginfunc,
  getdata
};
//* there is another method of authentication . in this user manually handles the token and there is no cookie .the commented code is the method of response
