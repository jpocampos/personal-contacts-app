import "core-js/stable"
import "regenerator-runtime/runtime"
import "./assets/css/style.css"
import Login from "./modules/Login.js"


const login = new Login(".form-login")
const register = new Login(".form-register")

login.init()
register.init()
