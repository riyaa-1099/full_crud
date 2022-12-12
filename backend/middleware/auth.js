const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
const token=req.headers?.authorization?.split(" ")[1]
if(token){
const decoded=jwt.verify(token,'hush')
if(decoded){
const userID=decoded.userID
req.body.userID=userID
next()
}
else{
    res.send({"msg":"Please login,decoded wrong"})
} 
}
else{
    res.send({"msg":"Not getting token"})
}
}

module.exports = {authentication}