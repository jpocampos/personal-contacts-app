const Contact = require("../models/contactModel")

// CONTACT HOME
exports.homeContact = (req, res) => {
    // CHECK LOGIN
    if(!req.session.user) return res.render("404.ejs")
    res.render("contactCreateView.ejs")
}

exports.createContact = async (req, res) => {
    const contact = new Contact(req.body, req.session.user.email)
    await contact.create()
    // CHECK ERRORS
    if(contact.errors.length > 0) {
            req.flash("errors", contact.errors)
            req.session.save(() => {
                return res.redirect("/contacts")
            })
            return  
        }
    // IF NOT THERE ARE ERROS, CREATE THE CONTACT ON DB
    req.flash("success", "Contato criado com sucesso!")
        req.session.save(() => {
            return res.redirect("/")
        })
    return  
}