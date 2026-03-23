const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController")
const registerController = require("./src/controllers/registerController")
const contatoController = require("./src/controllers/contatoController")
const { middlewareGlobal } = require("./src/middleware/middleware.js")

// Home
route.get("/", homeController.home)

// Login
route.get("/login", registerController.index)
route.post("/register", registerController.register)
route.post("/login", registerController.login)
route.get("/login/logout", registerController.logout)

// Contato
route.get("/contatos", contatoController.homeContato)
route.post("/contatos/create", contatoController.createContato)

module.exports = route