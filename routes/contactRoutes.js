const express = require("express");
const validateToken = require('../controllers/validateTokenHandler')
const { Router } = require("express");
const {getContacts, createContact, getContact, updateContact, deleteContact} = require("../controllers/contactControllers");
const router = Router();

// router.get("/", getContacts);
// router.post("/",createContact);
// router.get("/:id",getContact);
// router.put("/:id",updateContact);
// router.delete("/:id",deleteContact);

// or
//bringing out common functionality 
router.use(validateToken)
router.get("/", getContacts).post("/",createContact);
router.get("/:id",getContact).put("/:id",updateContact).delete("/:id",deleteContact)




module.exports = router;
