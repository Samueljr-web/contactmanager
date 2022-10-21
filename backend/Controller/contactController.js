const asyncHandler = require('express-async-handler')
const Contact = require("../Models/contactModel")
const User = require("../Models/userModel")
  
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find({user: req.user.id})
    res.status(200).json(contacts)
})
const createContact = asyncHandler(async(req, res) =>{
    if(!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
    const contact = await Contact.create({
        user: req.user.id,
        text: req.body.text
    })
    res.status(200).json(contact);
})
const updateContact = asyncHandler(async(req, res) =>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(400)
        throw new Error("contact not found")
    }
      const user = await User.findById(req.user.id)

      if(!user){
        req.status(401)
        throw new Error('User not found')
      }

      if(contact.user.toString() !== user.id){
        req.status(401)
        throw new Error('User not authorized')
      }


    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    res.status(200).json(updatedContact)
})
const deleteContact = asyncHandler(async(req, res) =>{
    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        res.status(400)
        throw new Error("contact not found")
    }

     const user = await User.findById(req.user.id);

     if (!user) {
       res.status(401);
       throw new Error("User not found");
     }

     if (contact.user.toString() !== user.id) {
       res.status(401);
       throw new Error("User not authorized");
     }

    await Contact.remove()
        res.status(200).json({id: req.params})
    
})

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
}