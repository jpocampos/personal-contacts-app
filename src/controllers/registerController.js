const RegisterUser = require("../models/RegisterModel")

exports.index = (req,res) => {
    res.render("loginView.ejs")
}

exports.register = async (req,res) => {
    const register = new RegisterUser(req.body)
    await register.register()
    
    if(register.errors.length > 0) {
        req.flash("errors", register.errors)
        req.session.save(() => {
            return res.redirect("/login")
        })
        return  
    }

    req.flash("success", "Usuário criado com sucesso!")
        req.session.save(() => {
            return res.redirect("/login")
        })
    return  
}

exports.login = async (req, res) => {
    try {
        const register = new RegisterUser(req.body)
        await register.login(req.body)

        if(register.errors.length > 0) {
            req.flash("errors", register.errors)
            req.session.save(() => {
                return res.redirect("/login")
            })
            return  
        }

        req.flash("success", "Usuário logado com sucesso!")
        req.session.user = register.user
        req.session.save(() => {
            return res.redirect("/")
        })
        return 
    } catch(e) {
        console.log(e)
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}