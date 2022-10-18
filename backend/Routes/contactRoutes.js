const express = require('express')
const router = express.Router()
const { getContacts, createContact, updateContact, deleteContact }= require('../Controller/contactController')

router.route('/').get(getContacts).post(createContact)
router.route('/:id').put(updateContact).delete(deleteContact)

module.exports = router