const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require("../Models/userModel");
const { generateToken, } = require("../utils/auth.utils");


//Register user
const registerUser = asynchandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

   //Checks if user exists
   const userExists = await User.findOne({email})

   if(userExists) {
    res.status(400)
    throw new Error("a user with this email already exists")
   }

    // password hash

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
    name,
    email,
    password: hashedPassword,
    })

    if(user){
        res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id),
        })
    } else {
        res.status(400)
    throw new Error("invalid data")
    }

})


//login user
const loginUser = asynchandler(async (req, res) => {
  const {email, password} = req.body
  
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
     res.status(201).json({
       _id: user.id,
       name: user.name,
       email: user.email,
       token: generateToken(user._id),
     });
  }else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
 
  
})

//Get user
const getUser = asynchandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email
  })
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}