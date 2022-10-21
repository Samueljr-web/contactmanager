const jwt = require('jsonwebtoken')
const asynchandler = require('express-async-handler')
const User = require('../Models/userModel')

const protect = asynchandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            //get token fromheaders
           token = req.headers.authorization.split(' ') [1]
           //verfy token
           const decoded = jwt.verify(token, process.env.JWT_SECRET)

           //get user
           req.user = await User.findById(decoded.id).select('-password')

           next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports= {
    protect
}