// const hashmap = new Map(); using wen token 
const Token = require("jsonwebtoken");
const secret = "subhani@1150$1070";
function setUid( user){
//  hashmap.set(id , user);
  return Token.sign({
  _id : user._id,
  name : user.name,
  email : user.email,
  role : user.role
 } , secret);
};

function showid(id){
  // return  hashmap.get(id);
  // if(!id) return null ;
  try {
    return Token.verify(id , secret);
    
  } catch (error) {
     return null;
  }

  
};
module.exports = {
    setUid,
    showid,
}
// this is a hjashmap and we are storing cookies and some user information in it and made another object in it based on which i created the middlewares . but there is a problem in it . 1 is that once server gets restared the hashmap gets cleared . so user have to login again and again . 2 this process is alot more memory consuming . so we need stateless authentication