const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email : String,
    password : String,
    name : String,
    age : Number,
    work: String
})
const Usermodel=mongoose.model("notesuser",userSchema)
module.exports={
    Usermodel
}