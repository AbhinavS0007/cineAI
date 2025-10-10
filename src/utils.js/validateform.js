export const Formvalidation = (email , password) => {

   const emailcheck =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
   

   return (
    emailcheck ? null : "please provide a valid email"
   )
}


export const  FormNameValidation = (name) => {
    const namecheck = /([a-zA-Z0-9_\s]+)/.test(name);

    return (
        namecheck ? null: "please enter a valid name"
    )
}

export const  FormPassValidation = (password) => {
    const passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    return (
        passwordcheck ?  null : "please provide a valid password"
    )
}