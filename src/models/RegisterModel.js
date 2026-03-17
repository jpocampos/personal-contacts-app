const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

// REGISTER SCHEMA
const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: {type: String, required: true}
})

// REGISTER MODEL
const RegisterModel = mongoose.model("users", RegisterSchema)

class RegisterUser {
    constructor(body) {
        this.body = body,
        this.errors = [],
        this.user = null
    }
    // START REGISTER
    async register() {
        try {
            this.valida()
            console.log(this.errors)
            if(this.errors.length > 0) return

            await this.userExist()
            
            if(this.errors.length > 0) return

            const salt = bcrypt.genSaltSync(10)

            this.body.password = bcrypt.hashSync(this.body.password, salt)

    
            RegisterModel.create(this.body).then(d => console.log(d))
        } catch(e) {
            console.log(e)
        }
    }

    async login() {
        this.valida()
        if(this.errors.length > 0) { return }

        await this.searchUser()

        if(!this.user) {
            return this.errors.push("Usuário não foi encontrado!")
        }

        this.checkPassword(this.body.password)

    }

    checkPassword(password) {
        if(!bcrypt.compareSync(password, this.user.password)) {
            return this.errors.push("Senha inválida!")
        }
    }

    async searchUser() {
        this.user = await RegisterModel.findOne({ email: this.body.email}).exec()
    }

    // CHECK THE PARAMS OF REGISTER
    valida() {
        this.isString()

        // CHECK EMAIL
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!')

        // CHECK PASSWORD
        if(!(this.body.password.length > 3 && this.body.password.length < 20)){
            this.errors.push('A senha precisa ter entre 3 à 20 caracteres!')
        }
    }

    // CHECK IF IS STRING
    isString() {
        for(const key in this.body) {
            if(typeof this.body[key] !== "string") {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    // VERIFY IF THE USER EXIST IN DB
    async userExist() {
        this.user = await RegisterModel.findOne({ email: this.body.email}).exec()   
        
        if(this.user) {this.errors.push("Usuário já existe!")}
    }
}


module.exports = RegisterUser