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
            return res.redirect("/contact")
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

exports.deleteContact = async (req, res) => {
    const contact = new Contact(null, req.params.id)
    await contact.delete(req.params.id)

    if(contact.errors.length > 0) {
        req.flash("errors", contact.errors)
        req.session.save(() => {
            return res.redirect("/")
        })
        return  
    }
    // IF NOT THERE ARE ERROS, CREATE THE CONTACT ON DB
    req.flash("success", "Contato deletado com sucesso!")
        req.session.save(() => {
            return res.redirect("/")
        })
    return  
}

exports.homeEditContact = (req, res) => {
    res.render("contactEditView.ejs")
}

exports.updateContact = async (req, res) => {
    const contact = new Contact(req.body, null)
    await contact.update(req.params.id)
    res.redirect("/")
}