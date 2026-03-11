const mongoose = require('mongoose');
const schema2 = mongoose.Schema({
    name :{
        type : String ,
        required : true , 
    },
    email :{
        type : String , 
        unique : true,
        required : true,
    },
    password :{
        type : Number,
        required : true,
    },
    role:{
    type:String ,
    default :"NORMAL",
    required : true,
}
}, {timestamps: true});
const model2 = mongoose.model('newuser3' ,schema2);
module.exports = model2;