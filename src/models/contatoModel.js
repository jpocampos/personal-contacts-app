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
    async create() {
        try {
            this.valida()
            if(this.errors.length > 0) return
            console.log("teste")
            this.body.user = this.user
            await ContatoModel.create(this.body).then((data) => console.log(data))
        } catch(e) {
            console.log(e)
        }

    }

    // CHECK THE PARAMS OF REGISTER
    valida() {
        this.isString()
        // CHECK EMAIL
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido!') 
        // CHECK IF THERE IS A NAME
        if(!this.body.name) this.errors.push("O campo nome deve estar preenchido!")
        // CHECK NAME LENGTH
        if(this.body.name.length > 20) this.errors.push("O campo nome deve até 20 caracteres!")
        // CHECK IF THERE ARE A CONTACT WAY
        if(!this.body.email && !this.body.cel) this.errors.push("É preciso colocar um email ou um telefone!")
        // CHECK CEL LENGTH
        if(this.body.cel.length > 20) this.errors.push("O campo telefone deve até 20 caracteres!")
        // CHECK IF THERE IS A "USER" IN SESSION
        if(!this.user) this.errors.push("Erro na sua sessão, deslogue e tente novamente!")
    }

    isString() {
        for(const key in this.body) {
            if(typeof this.body[key] !== "string") {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            name: this.body.name,
            cel: this.body.cel,
        }
    }
}

module.exports = Contato