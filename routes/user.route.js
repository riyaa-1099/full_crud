const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')

const userRouter=express.Router()

const {Usermodel}=require("../models/user.model")

userRouter.post("/signup", async (req, res) => {
    const {email, password,name,age,work} = req.body;
    const userPresent = await Usermodel.findOne({email})
    if(userPresent){
        res.send("Try loggin in, already exist")
    }
    else{
    try{
        bcrypt.hash(password, 4, async function(err, hash) {
            const user = new Usermodel({email,password:hash,name,age,work})
            await user.save()
            res.send("Sign up successfull")
        })
    }    
   catch(err){
        console.log(err)
        res.send("Something went wrong, pls try again later")
   }
}
})

userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await Usermodel.find({email})     
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush',{expiresIn:'2h'});
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})

module.exports={userRouter}