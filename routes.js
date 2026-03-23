const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController")
const registerController = require("./src/controllers/registerController")
const contactController = require("./src/controllers/contactController")
const { middlewareGlobal, loadContactHome } = require("./src/middleware/middleware.js")

// Home
route.get("/", loadContactHome, homeController.home)

// Login
route.get("/login", registerController.index)
route.post("/register", registerController.register)
route.post("/login", registerController.login)
route.get("/login/logout", registerController.logout)

// Contacts
route.get("/contact", contactController.homeContact)
route.post("/contact/create", contactController.createContact)

module.exports = route