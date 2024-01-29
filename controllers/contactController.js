// @desc Get all contacts
// @route GET /api/v1/contacts
// @access public
const getAllContacts = (req, res) => {
  res.status(200).json({ message: "All contacts" });
};

// @desc Get contact by ID
// @route GET /api/v1/contacts/:id
// @access public
const getContactById = (req, res) => {
  res.status(200).json({ message: `Get contact by id ${req.params.id}` });
};

// @desc Create a new contact
// @route POST /api/v1/contacts
// @access public
const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  res.status(201).json({ message: `Create contact` });
};

// @desc Update a contact
// @route PUT /api/v1/contacts/:id
// @access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update a contact by ${req.params.id}` });
};

// @desc Delete a contact
// @route DELETE /api/v1/contacts/:id
// @access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete a contact by ${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
