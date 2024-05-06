const mongoose = require ('mongoose')

const loginSchema =new mongoose.Schema({
f_sno:{
    type:String,
    required:true
},
f_userName:{
    type:String, 
    required:true
},
f_Pwd:{
    type:String,
    required:true
}

})
const logins = mongoose.model("logins",loginSchema)
module.exports = logins