const Contato = require("../models/contatoModel")

exports.homeContato = (req, res) => {
    res.render("contatos")
}

exports.createContato = (req, res) => {
    const contato = new Contato(req.body, req.session.user.email)
    contato.create()
}