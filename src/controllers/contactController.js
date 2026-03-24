const Contact = require("../models/contactModel")

// CONTACT HOME
exports.homeContact = (req, res) => {
    // CHECK LOGIN
    res.render("contactCreateView.ejs")
    
}

// CREATE CONTACT
exports.createContact = async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.render("404.ejs")
    }
}

// DELETE CONTACT
exports.deleteContact = async (req, res) => {
    try{
        const contact = new Contact(null, req.params.id)
        await contact.delete(req.params.id)
        // SAVE THE SUCCESS MESSAGE
        req.flash("success", "Contato deletado com sucesso!")
            req.session.save(() => {
                return res.redirect("/")
            })
        return  
    } catch (e) {
        console.log(e)
        res.render("404.ejs")
    }
}

// CONTACT HOME VIEW
exports.homeEditContact = (req, res) => {
    // CHECK LOGIN
    res.render("contactEditView.ejs")
}

// UPDATE THE CONTACT
exports.updateContact = async (req, res) => {
    try{
        const contact = new Contact(req.body, null)
        await contact.update(req.params.id)
        // SAVE THE SUCCESS MESSAGE
        req.flash("success", "Contato atualizado com sucesso!")
        req.session.save(() => {
            return res.redirect("/")
        })
    } catch (e) {
        console.log(e)
        res.render("404.ejs")
    }
}