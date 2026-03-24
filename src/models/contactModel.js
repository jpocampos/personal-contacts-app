const mongoose = require("mongoose")
const validator = require("validator")

const ContactSchema = mongoose.Schema({
    user: { type: 'String', required: true },
    name: { type: 'String', required: true },
    cel: { type: 'String', required: false, default: '' },
    email: { type: 'String', required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
})

const  ContactModel = mongoose.model('contacts', ContactSchema)

class Contact {
    constructor(body, user) {
        this.body = body,
        this.user = user,
        this.errors = [],
        this.contact = null
    }

    // DELETE METHOD
    async delete(id) {
        try{
            if(typeof id !== "string") return
            const contact = await ContactModel.findByIdAndDelete(id)
            return contact
        } catch(e) {
            console.log(e)
            this.errors.push("Um erro inesperado aconteceu, caso persiste contate o suporte!")
        }
        
    }

    async searchContactById(id) {
        if(typeof id !== "string") return
        const contact = await ContactModel.findOne({ _id: id})
        return contact
    }

    // SEARCH CONTACT IN DB USING "USER"
    async searchContact() {
        const data = await ContactModel.find({user: this.user})
        return data
    }


    // CREATE A CONTACT IN DB
    async create() {
        try {
            this.valida()
            if(this.errors.length > 0) return
            console.log("teste")
            this.body.user = this.user
            await ContactModel.create(this.body)
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
        if(this.body.name.length > 40) this.errors.push("O campo nome deve até 40 caracteres!")
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

module.exports = Contact