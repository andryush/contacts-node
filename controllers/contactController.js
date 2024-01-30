const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/v1/contacts
// @access public
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();
  res.status(200).json(contacts);
});

// @desc Get contact by ID
// @route GET /api/v1/contacts/:id
// @access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No contact found");
  }
  res.status(200).json(contact);
});

// @desc Create a new contact
// @route POST /api/v1/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = Contacts.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc Update a contact
// @route PUT /api/v1/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No contact found");
  }

  const updateContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

// @desc Delete a contact
// @route DELETE /api/v1/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No contact found");
  }

  await Contacts.deleteOne({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
