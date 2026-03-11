const { showid } = require("../services/service1");
const mongoose = require("mongoose")
// async function restrictunloggedusers(req, res, next) {
//   const userid = req.cookies.uuid;
//   const user = showid(userid);
//   // console.log(user);

//   if (!userid) res.redirect("/signup/login");
//  else if (!user) {
//     res.redirect("/signup/login");
//   } 
//   else{
// req.user = user  ;

//       next();
//   }

// }
// async function checkuser(req, res, next) {
//   const userid = req.cookies.uuid;
//   const user = showid(userid); 
//     req.user = user;

//   next();
// }
// const tokei = req.headers["authorization"];
// if(!tokei) res.redirect('/signup/login')
// it will give like "beare 4139478248-184-1841" now we would extract the code
//  const userid = tokei.split("Bearer ")[1];
function checkforauthentication(req , res , next ){
  const userid = req.cookies.uuid;
  const user = showid(userid);
  if (!userid ||!user) {
    req.user = null;
    return next();
  }
  req.user =user;
  console.log(user);
  return next();
};
 function restrictuser(roles =[]) {
  return function (req , res , next ){
    try {
         if (!req.user) {
      // res.redirect('/login.html') 
      res.redirect("/signup/login");
    }
   else if(!roles.includes(req.user.role)){
     return res.end("UNAUTHORIZED");
    }
    return next();
  }
    catch (error) {
      console.log(error);
      
    }}
  //   if (!req.user) {
  //     res.redirect('/login.html') 
  //     // res.redirect("/signup/login");
  //   }
  //   if(!roles.includes(req.user.role)){
  //    return res.end("UNAUTHORIZED");
  //   }
  //   return next();
  // }
  }

// restrictunloggedusers , checkuser ,
module.exports = {  checkforauthentication , restrictuser}