const Contact = require("../models/contactModel")

exports.middlewareGlobal = (req, res,  next) => {
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    next()
}

exports.loadContactHome = async (req, res, next) => {
    try {
        const contact = new Contact(null, req.session.user.email)
        const data = await contact.searchContact()
        res.locals.contactData = data
        next()
    } catch(e) {
        console.log(e)
        next()
    }
}

exports.middlewareError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.render("404.ejs")
    }
}

exports.middlewareCsrf = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}