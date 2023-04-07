const asyncHandler = require("express-async-handler");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@description: Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please add all Fields")
    }
    const userAvailability = await userSchema.findOne({email});
    if(userAvailability){
        res.status(400);
        throw new Error("Already Email is Registered")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user=await userSchema.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    if(user)
    {
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400).json("User data is not validated")
    }
   
})


//@description: login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are manditory")
    }
    const user = await userSchema.findOne({email});
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"15m"})
        res.status(200).json({
            accessToken
        })
    }else{
        res.status(401)
        throw new Error("Password or Email are Wrong")
    }
   
})

//@description: current a user
//@route POST /api/users/login
//@access public
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})
module.exports = {registerUser,loginUser,currentUser}