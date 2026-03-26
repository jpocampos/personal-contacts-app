import * as zod from "zod"; 

export default class Login {
    constructor(formClass) {
        this.formClass = document.querySelector(formClass)
        this.errors = []
    }

    // Init validation
    init() {
        if (!this.formClass) return
        this.event()
    }

    // Freeze the form
    event() {
        this.formClass.addEventListener("submit", (e) => {
            e.preventDefault()
            this.valid()
        })
    }
    
    // Start check de params of validation
    valid() {
        // Select Inputs
        const nameInput = this.formClass.querySelector('input[name="name"]')
        const emailInput = this.formClass.querySelector('input[name="email"]')
        const celInput = this.formClass.querySelector('input[name="cel"]')
        

        // Make a object based on inputs
        const obj = {
            name: nameInput.value,
            email: emailInput.value,
            cel: celInput.value
        }

        console.log(obj)
        // Check params of create/edit contact
        this.checkParam(obj)
        // If an error occurs, it will be displayed on screen
        if(this.errors.length > 0) return this.showErrors(this.errors)
        // Subit the form
        return this.formClass.submit()
    }

    // Show error on screen
    showErrors(errors) {
        // Call functions to check for errors on screen
        this.hasErrorMessage()
        // Create a div for erros
        const div = document.createElement('div');
        // Set class on div
        div.classList.add('alert', 'alert-danger');

        // Place the error message on div
        errors.forEach(err => {
            const p = document.createElement('p');
            p.textContent = err;
            div.appendChild(p);
        });

        // Place the div in error-container
        document.getElementById('error-container').appendChild(div);

        // Clean up the errors
        this.errors = []
    }
    
    // Function to check for errors on scren
    hasErrorMessage() {
        // Check if has a class with these class
        const existingAlert = document.querySelector('.alert.alert-danger');
        const successAlert = document.querySelector('.alert.alert-success');

        // If has a class, it will be removed
        if (existingAlert) existingAlert.remove();
        if (successAlert) successAlert.remove();
    }

    // Check email and password using zod
    checkParam(obj) {
        // Make a schema
        const User = zod.object({
            // name
            name: zod.string()
            .max(40, "O tamanho máximo é 40 caracteres")
            .refine((val) => val.trim().length > 0, {
                message: "É preciso informar um nome"
            }),
            // email
            email: zod.email("Email inválido").or(zod.literal("")),
            // Cel
            cel: zod.string()
            .max(20, "O máximo de digitos para um telefone são 20 dígitos")
            .refine((val) => val === "" || val.trim().length > 0, {
                message: "É preciso informar telefone válido",
            })
            // Check if has a way to contact
        }).superRefine((dados, ctx) => {
            if(dados.email === "" && dados.cel === "") {
                console.log(dados.email)
                console.log(dados.email)
                ctx.addIssue({
                    code: "contact_error",
                    message: "É preciso ao menos um meio de contato",
                    input: ['contact']
                })
            }
        }) 
        
        // Check if the "obj" is "safe"
        const result = User.safeParse(obj);
        
        if (!result.success) {
            // Object contains the errors
            this.errors = []
            const objError = zod.flattenError(result.error)
            // Clean up the errors
            if(this.errors.length > 0) this.errors = []
            Object.values(objError).forEach((data) => {
                if(Array.isArray(data)) {
                    data.forEach((i) => this.errors.push(i))
                } else if(typeof data === "object" && data !== null ) {
                    Object.values(data).forEach(i => this.errors.push(i[0]));
                }
            }) 
        } else {
            // Return true
            return result.success
        }
    }
}