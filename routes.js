const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController")
const registerController = require("./src/controllers/registerController")
const contactController = require("./src/controllers/contactController")
const { loadContactById, loadContactHome, isLoged } = require("./src/middleware/middleware.js")

// Home
route.get("/", isLoged, loadContactHome, homeController.home)

// Login
route.get("/login", registerController.index)
route.post("/register", registerController.register)
route.post("/login", registerController.login)
route.get("/login/logout", registerController.logout)

// Contacts
route.get("/contact", isLoged, contactController.homeContact)
route.post("/contact/create", isLoged, contactController.createContact)
route.get("/contact/delete/:id", isLoged, contactController.deleteContact)
route.get("/contact/edit/index/:id", isLoged, loadContactById, contactController.homeEditContact)
route.post("/contact/edit/update/:id", isLoged, contactController.updateContact)

module.exports = route