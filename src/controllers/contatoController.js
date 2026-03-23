const Contato = require("../models/contatoModel")

exports.homeContato = (req, res) => {
    if(!req.session.user) return res.render("404.ejs")
    res.render("contatosCreateView.ejs")
}

exports.createContato = async (req, res) => {
    const contato = new Contato(req.body, req.session.user.email)
    await contato.create()

    if(contato.errors.length > 0) {
            req.flash("errors", contato.errors)
            req.session.save(() => {
                return res.redirect("/contatos")
            })
            return  
        }
    
    req.flash("success", "Contato criado com sucesso!")
        req.session.save(() => {
            return res.redirect("/")
        })
    return  
}