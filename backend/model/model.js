const mongoose = require("mongoose");
const newuser3 = require("./signup")
const myschema =new mongoose.Schema({
shorturl :{
    type : String,
    unique : true,
    required : true,
},
redirecturl :{
    type : String ,
    unique :true,
},
history :[{
    timestamps :
     {type : Number}

}],//? an array containing object having timestamp an object
createdby : {
   type:mongoose.Schema.Types.ObjectId,
   ref :newuser3 
}
}, {timestamps : true})
const newuser2 =   mongoose.model('newuser2' , myschema);
module.exports = newuser2;

