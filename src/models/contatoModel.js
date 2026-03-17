const mongoose = require("mongoose")
const validator = require("validator")

const ContatoSchema = mongoose.Schema({
    user: { type: 'String', required: true },
    name: { type: 'String', required: true },
    cel: { type: 'String', required: false, default: '' },
    email: { type: 'String', required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
})

const  ContatoModel = mongoose.model('contacts', ContatoSchema)

class Contato {
    constructor(body, user) {
        this.body = body,
        this.user = user,
        this.errors = [],
        this.contato = null
    }

    // CREATE A CONTACT IN DB
    create() {
        this.valida()
        console.log(this.errors)
        if(this.errors > 0) return
        this.body.user = this.user
        ContatoModel.create(this.body).then((data) => console.log(data))
    }

    // CHECK THE PARAMS OF REGISTER
    valida() {
        this.isString()

        // CHECK EMAIL
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido!') 
        // CHECK IF THERE IS A NAME
        if(!this.body.nome) this.errors.push("O campo nome deve estar preenchido!")
        // CHECK IF THERE ARE A CONTACT WAY
        if(!this.body.nome && !this.body.cel) this.errors.push("É preciso colocar um email ou um telefone!")
        // CHECK IF THERE IS A "USER" IN SESSION
        if(!this.user) this.errors.push("Erro na sua sessão, deslogue e tente novamente!")
    }
}

module.exports = Contato