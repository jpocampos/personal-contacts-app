require("dotenv").config()
// EXPRESS
const express = require("express")
const app = express()
const port = 3000
const route = require("./routes.js")
const path = require('path')
const csrf = require("csurf")


// MIDDLEWARE
const { middlewareGlobal, middlewareCsrf, middlewareError } = require("./src/middleware/middleware.js")

// DATABASE
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit("connected")
        console.log("MongoDB connected")
    })
    .catch((e) => console.log(e))

// CONFIGS
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.json())

// SESSION

const session = require('express-session');
const { default: MongoStore } = require('connect-mongo');

const sessionOptions = session({
    secret: "asjdkaaldjkaleji912013190(@@#$%ŝajdkl;!@#$%^&",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
app.use(sessionOptions)

// FLASH MESSAGE
const flash = require("connect-flash")
app.use(flash())

app.set("view-engine", "ejs")
app.set("views", path.resolve(__dirname, "src", "views"))

// CSRF
app.use(csrf())

// MIDDLEWARE
app.use(middlewareCsrf)
app.use(middlewareError)
app.use(middlewareGlobal)
console.log(middlewareCsrf)

// USE ROUTE
app.use(route)

// RUN SERVER
app.on("connected", () => {
    app.listen(port, () => {
        console.log("http://localhost:3000")
    })
})