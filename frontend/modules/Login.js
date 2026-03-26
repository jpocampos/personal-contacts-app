import * as zod from "zod"; 

export default class Login {
    constructor(formClass) {
        this.formClass = document.querySelector(formClass)
        this.errors = []
    }

    init() {
        this.event()
    }

    event() {
        this.formClass.addEventListener("submit", (e) => {
            e.preventDefault()
            const resultObj = this.valid()
            console.log(this.errors.length)
            
        })
    }
    
    valid() {
        const emailInput = document.querySelector('input[name="email"]')
        const passwordInput = document.querySelector('input[name="password"]')

        const obj = {
            email: emailInput.value,
            password: passwordInput.value
        }

        const result = this.checkEmailAndPassword(obj)
        if(this.errors.length > 0) return this.showErrors(this.errors)

        return this.formClass.submit()
    }

    showErrors(errors) {
        this.hasErrorMessage()
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger');

        errors.forEach(err => {
            const p = document.createElement('p');
            p.textContent = err;
            div.appendChild(p);
        });

        document.getElementById('error-container').appendChild(div);

        this.errors = []
    }
    
    hasErrorMessage() {
        const existingAlert = document.querySelector('.alert.alert-danger');
        const successAlert = document.querySelector('.alert.alert-success');

        if (existingAlert) existingAlert.remove();
        if (successAlert) successAlert.remove();
        console.log("pass")
    }

    
    checkEmailAndPassword(obj) {
        const User = zod.object({
            email: zod.email(),
            password: zod.string().min(3).max(20)
        })
        
        const result = User.safeParse(obj);
        // Checks for validation errors and adds formatted messages to this.errors
        if (!result.success) {
            const objError = zod.flattenError(result.error)

            if(this.errors.length > 0) this.errors = []
            
            // The object contains the name of the erros and your formatted version
            const errorMessages = {
                "Invalid email address": "Email inválido",
                "Too small: expected string to have >=3 characters": "A senha deve ter entre 3 à 20 caracteres",
                "Too big: expected string to have <=20 characters": "A senha deve ter entre 3 à 20 caracteres",
            }
            
            for(let i in objError.fieldErrors){
                const error = objError.fieldErrors[i]
                const msg = errorMessages[error] || "Erro desconhecido"
                
                this.errors.push(msg)
            }
        } else {
            return result.success
        }
    }
}