import "core-js/stable"
import "regenerator-runtime/runtime"
import "./assets/css/style.css"
import Login from "./modules/Login.js"
import Contact from "./modules/Contact.js"


const login = new Login(".form-login")
const register = new Login(".form-register")
const contactCreate = new Contact(".form-contact-create")
const contactEdit = new Contact(".form-contact-edit")

login.init()
register.init()
contactCreate.init()
contactEdit.init()
