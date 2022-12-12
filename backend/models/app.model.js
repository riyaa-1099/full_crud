const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
title:String,
description:String,
userID:String
})
const Notemodel=mongoose.model("notesapp",noteSchema)
module.exports={
    Notemodel
}