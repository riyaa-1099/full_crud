const express=require("express")

const {connection}=require("./config/db");
const { authentication } = require("./middleware/auth");
const {notesRouter}=require("./routes/app.route")
const {userRouter}=require("./routes/user.route")

const app=express();

app.use(express.json())

app.use("/user",userRouter)

app.use(authentication)
app.use("/notes",notesRouter)

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.listen(7500,async()=>{
    try{
    await connection;
    console.log("connected to DB successfully")
    }
    catch(err){
    console.log("Error connecting to DB")
    console.log(err)
    }
    console.log("Listening on port")
    })