const asyncHandler = require('express-async-handler')
const Contact = require("../Models/contactModel")
  
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})
const createContact = asyncHandler(async(req, res) =>{
    if(!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
    const contact = await Contact.create({
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
    await Contact.remove()
        res.status(200).json({id: req.params})
    
})

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
}