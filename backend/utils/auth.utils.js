const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env;


const generateToken = (id) => 
    jwt.sign({id}, JWT_SECRET, { expiresIn: "30d"}
)

module.exports = {
   generateToken,
}