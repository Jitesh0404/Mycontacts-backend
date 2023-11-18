const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({user_id:req.user.id});
  res.status(200).json(contact);
});

//@desc Create New contacts
//@route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request data is  : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(201).send(contact);
});

//@desc Get contact
//@route Get /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id.length < 24) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    req.status(403);
    throw new Error("User don't have permission to update other user contacts")
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route put /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log("Update Contact is : ",updateContact);
  res.status(200).json(updateContact);
});

//@desc delete contact
//@route delete /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    req.status(403);
    throw new Error("User don't have permission to update other user contacts")
  }
  await Contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
