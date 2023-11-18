const express = require("express")
const {Router}  = require('express');
const { registerUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../controllers/validateTokenHandler");
const router = Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken, currentUser)


module.exports = router;